import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error) {
      // You can also log the error to an error reporting service
      console.log(error);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>This solver is not available at this time.</h1>;
      }
  
      return this.props.children; 
    }
}

export default ErrorBoundary;