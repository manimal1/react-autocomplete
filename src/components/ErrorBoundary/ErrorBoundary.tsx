import React, { ErrorInfo } from 'react';
import { Card } from 'components';

interface Props {
  message?: string;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo); // eslint-disable-line no-console
  }

  render() {
    const msg = this.props.message || 'Sorry, something went wrong. Please try refreshing the page.';
    if (this.state.hasError) {
      return (
        <Card>
          <h4>{msg}</h4>
        </Card>
      );
    }

    return this.props.children;
  }
}
