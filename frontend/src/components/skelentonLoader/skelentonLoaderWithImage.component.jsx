import "./skelentonLoader.style.css";

const SkeletonLoaderWithImage = () => {
  return (
    <div className="skeleton-loader">
      <div className="skeleton-image"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text"></div>
    </div>
  );
};

export default SkeletonLoaderWithImage;
