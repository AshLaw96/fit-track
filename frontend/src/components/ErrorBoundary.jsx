import React from "react";
import "../styles/ErrorPages.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container error-container">
          <h1 className="error-heading error-500-heading">
           <i class="fa-solid fa-triangle-exclamation"></i> 500 - Oops! Something went wrong.
          </h1>
          <p className="error-message">
            We're experiencing some technical difficulties right now. Don't worry — your fitness progress is safe! Please try again later or head back home.
          </p>
          <a href="/" className="btn btn-secondary btn-return-home">
            Return Home
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
