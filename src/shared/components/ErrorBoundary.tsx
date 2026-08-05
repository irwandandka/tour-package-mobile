import { Component, ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ErrorState } from "./ErrorState";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * React only catches render errors via class components with
 * getDerivedStateFromError/componentDidCatch — no hook equivalent exists.
 * Wraps RootNavigator so a render error shows a recoverable screen instead
 * of an unhandled crash with a blank screen.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Unhandled render error:", error);
  }

  reset = () => this.setState({ hasError: false });

  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
          <ErrorState
            title="Something went wrong"
            description="The app hit an unexpected error. Please try again."
            onRetry={this.reset}
            retryLabel="Reload"
          />
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}
