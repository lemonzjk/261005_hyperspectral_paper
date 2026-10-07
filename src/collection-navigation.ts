import { useEffect } from 'react';

const key = (collection: string) => `hsi-collection-${collection}`;
export function collectionHref(collection: 'hs3d' | 'hyperspectral') {
  const saved = sessionStorage.getItem(key(collection));
  return saved || (collection === 'hyperspectral' ? '?collection=hyperspectral' : '?view=atlas');
}
/** Keep independent URLs and reading positions when following collection links. */
export function useCollectionNavigation(collection: 'hs3d' | 'hyperspectral') {
  useEffect(() => {
    const record = () => {
      sessionStorage.setItem(key(collection), window.location.search || '?view=atlas');
      sessionStorage.setItem(`${key(collection)}-scroll`, String(window.scrollY));
    };
    const frame = requestAnimationFrame(() => {
      const scroll = sessionStorage.getItem(`${key(collection)}-scroll`);
      if (scroll && sessionStorage.getItem(key(collection)) === (window.location.search || '?view=atlas')) window.scrollTo(0, Number(scroll));
    });
    window.addEventListener('pagehide', record);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('pagehide', record); };
  }, [collection]);
}
