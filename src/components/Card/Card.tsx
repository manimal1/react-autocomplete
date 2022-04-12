import { FC, ReactNode } from 'react';
import './Card.css';

interface Props {
  children: ReactNode;
}

export const Card: FC<Props> = ({ children }) => <div className="card">{children}</div>;
