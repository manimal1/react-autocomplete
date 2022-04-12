import { FC } from 'react';
import { MovieSearchInput } from 'containers';
import { Card, ErrorBoundary, Title } from 'components';
import './index.css';

export const App: FC = () => {
  return (
    <div className="app">
      <ErrorBoundary>
        <Card>
          <Title />
          <MovieSearchInput />
        </Card>
      </ErrorBoundary>
    </div>
  );
};
