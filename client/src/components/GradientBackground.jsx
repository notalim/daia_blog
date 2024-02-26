const GradientBackground = ({ children }) => (
    <div className="relative w-full h-full">
      <div className="absolute top-0 left-0 w-full h-full bg-white" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div
          className="w-80 h-80 bg-purple-500 bg-opacity-20 rounded-full absolute -right-40 -bottom-10"
          style={{ filter: 'blur(50px)' }}
        />
        <div
          className="w-80 h-80 bg-orange-500 bg-opacity-20 rounded-full absolute -left-40 -top-10"
          style={{ filter: 'blur(50px)' }}
        />
      </div>
      {children}
    </div>
  );
  
  export default GradientBackground;
  