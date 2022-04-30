import { usePage } from './usePage';

export const useMetaService = () => {
  const page = usePage();
  return page.metaService;
};
