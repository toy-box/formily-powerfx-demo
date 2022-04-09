import { useContext } from 'react';
import { PageContext } from '../context';

export const usePage = () => useContext(PageContext);
