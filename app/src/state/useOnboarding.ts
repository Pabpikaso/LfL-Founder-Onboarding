import { useCallback, useEffect, useRef, useState } from 'react';
import { CATCONFIG, FOUNDER_QUESTIONS, emptyDish } from '../data/constants';
import type { Dish, FieldErrors, OnboardingData, Screen } from '../types';
import { clearPersisted, loadPersisted, savePersisted } from '../utils/storage';
import { validateScreen } from '../utils/validation';

const FLOW_AFTER_S2: Screen[] = ['s3', 's4', 'review', 'pay', 'welcome'];

export function useOnboarding() {
  const persisted = useRef(loadPersisted()).current;

  const [screen, setScreenState] = useState<Screen>(persisted.screen || 'landing');
  const [q, setQ] = useState<number>(persisted.q || 0);
  const [data, setData] = useState<OnboardingData>(persisted.data || {});
  const [errors, setErrors] = useState<FieldErrors>({});
  const [toast, setToast] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);

  const savedTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    savePersisted({ screen, q, data });
  }, [screen, q, data]);

  const flashSaved = useCallback(() => {
    setJustSaved(true);
    clearTimeout(savedTimer.current);
    savedTimer.current = setTimeout(() => setJustSaved(false), 1400);
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const updateField = useCallback(
    (key: string, val: string) => {
      setData((d) => ({ ...d, [key]: val }));
      setErrors((e) => ({ ...e, [key]: undefined }));
      flashSaved();
    },
    [flashSaved],
  );

  const uploadFile = useCallback(
    (key: string, file: File) => {
      const url = URL.createObjectURL(file);
      setData((d) => ({ ...d, [key]: url }));
      setErrors((e) => ({ ...e, [key]: undefined }));
      flashSaved();
    },
    [flashSaved],
  );

  const onGalleryPick = useCallback(
    (files: FileList) => {
      const urls = Array.from(files)
        .slice(0, 6)
        .map((f) => URL.createObjectURL(f));
      setData((d) => ({ ...d, gallery: [...(d.gallery || []), ...urls].slice(0, 6) }));
      flashSaved();
    },
    [flashSaved],
  );

  const removeGalleryPhoto = useCallback(
    (i: number) => {
      setData((d) => ({ ...d, gallery: (d.gallery || []).filter((_, j) => j !== i) }));
      flashSaved();
    },
    [flashSaved],
  );

  const moveGalleryPhoto = useCallback(
    (i: number, dir: -1 | 1) => {
      setData((d) => {
        const g = [...(d.gallery || [])];
        const j = i + dir;
        if (j < 0 || j >= g.length) return d;
        [g[i], g[j]] = [g[j], g[i]];
        return { ...d, gallery: g };
      });
      flashSaved();
    },
    [flashSaved],
  );

  const toggleHighlight = useCallback(
    (name: string) => {
      setData((d) => {
        const cur = d.highlights || [];
        const has = cur.includes(name);
        return { ...d, highlights: has ? cur.filter((x) => x !== name) : [...cur, name] };
      });
      flashSaved();
    },
    [flashSaved],
  );

  const toggleMulti = useCallback(
    (key: string, val: string, max?: number) => {
      setData((d) => {
        const cur = (d[key] as string[]) || [];
        const has = cur.includes(val);
        if (!has && max && cur.length >= max) return d;
        return { ...d, [key]: has ? cur.filter((x) => x !== val) : [...cur, val] };
      });
      flashSaved();
    },
    [flashSaved],
  );

  const setPrivilege = useCallback(
    (name: string) => updateField('privilege', name),
    [updateField],
  );

  const setPriceRange = useCallback(
    (sym: string) => updateField('priceRange', sym),
    [updateField],
  );

  const dropPin = useCallback(() => {
    updateField('maps', 'pinned');
    showToast('Pin dropped on the map.');
  }, [updateField, showToast]);

  const addDish = useCallback(() => {
    setData((d) => ({ ...d, dishes: [...(d.dishes || []), emptyDish()].slice(0, 5) }));
    flashSaved();
  }, [flashSaved]);

  const updateDish = useCallback(
    (i: number, field: keyof Dish, val: string) => {
      setData((d) => {
        const dishes = [...(d.dishes || [])];
        dishes[i] = { ...dishes[i], [field]: val };
        return { ...d, dishes };
      });
      flashSaved();
    },
    [flashSaved],
  );

  const updateDishPhoto = useCallback(
    (i: number, file: File) => {
      const url = URL.createObjectURL(file);
      updateDish(i, 'photo', url);
    },
    [updateDish],
  );

  const removeDish = useCallback(
    (i: number) => {
      setData((d) => ({ ...d, dishes: (d.dishes || []).filter((_, j) => j !== i) }));
      flashSaved();
    },
    [flashSaved],
  );

  const go = useCallback((next: Screen) => {
    setScreenState(next);
    setErrors({});
  }, []);

  const hasCat = useCallback(() => !!CATCONFIG[data.category || ''], [data.category]);

  const validate = useCallback((): boolean => {
    const e = validateScreen(screen, data, q);
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [screen, data, q]);

  const next = useCallback(() => {
    if (!validate()) {
      flashSaved();
      return;
    }
    if (screen === 'founder') {
      if (q < FOUNDER_QUESTIONS.length - 1) {
        setQ((n) => n + 1);
        setErrors({});
      } else {
        go('s2');
      }
      return;
    }
    if (screen === 's2') {
      go(hasCat() ? 'catdetail' : 's3');
      return;
    }
    if (screen === 'catdetail') {
      go('s3');
      return;
    }
    const i = FLOW_AFTER_S2.indexOf(screen);
    if (i >= 0 && i < FLOW_AFTER_S2.length - 1) go(FLOW_AFTER_S2[i + 1]);
  }, [screen, q, validate, flashSaved, go, hasCat]);

  const back = useCallback(() => {
    if (screen === 'founder') {
      if (q > 0) {
        setQ((n) => n - 1);
        setErrors({});
      } else {
        go('landing');
      }
      return;
    }
    const map: Partial<Record<Screen, Screen>> = {
      s2: 'founder',
      catdetail: 's2',
      s3: hasCat() ? 'catdetail' : 's2',
      s4: 's3',
      review: 's4',
      pay: 'review',
    };
    const target = map[screen];
    if (target) go(target);
  }, [screen, q, go, hasCat]);

  const startApply = useCallback(() => go('founder'), [go]);

  const saveLater = useCallback(() => {
    savePersisted({ screen, q, data });
    showToast('Saved. Come back anytime from the same device.');
  }, [screen, q, data, showToast]);

  const restart = useCallback(() => {
    clearPersisted();
    setScreenState('landing');
    setQ(0);
    setData({});
    setErrors({});
  }, []);

  const jumpToFounderStart = useCallback(() => {
    setQ(0);
    go('founder');
  }, [go]);

  return {
    screen,
    q,
    setQ,
    data,
    errors,
    toast,
    justSaved,
    updateField,
    uploadFile,
    onGalleryPick,
    removeGalleryPhoto,
    moveGalleryPhoto,
    toggleHighlight,
    toggleMulti,
    setPrivilege,
    setPriceRange,
    dropPin,
    addDish,
    updateDish,
    updateDishPhoto,
    removeDish,
    go,
    next,
    back,
    startApply,
    saveLater,
    restart,
    hasCat,
    jumpToFounderStart,
    showToast,
  };
}

export type OnboardingApi = ReturnType<typeof useOnboarding>;
