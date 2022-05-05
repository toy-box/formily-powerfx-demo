import { useContext } from 'react';
import { PageContext } from '../components/Page/context';

export const usePage = () => useContext(PageContext);
