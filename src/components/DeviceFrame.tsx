import React from 'react';

interface DeviceFrameProps {
  children: React.ReactNode;
  device?: 'iphone-17-pro-max' | 'iphone-16-pro-max' | 'iphone-14-pro' | 'iphone-14' | 'pixel-7';
  showFrame?: boolean;
  orientation?: 'portrait' | 'landscape';
  darkMode?: boolean;
}

const DeviceFrame: React.FC<DeviceFrameProps> = ({ 
  children, 
  device = 'iphone-17-pro-max',
  showFrame = true,
  orientation = 'portrait',
  darkMode = true
}) => {
  if (!showFrame) {
    return <>{children}</>;
  }

  const deviceSpecs = {
    'iphone-17-pro-max': { width: 440, height: 956, notch: 'dynamic-island' },
    'iphone-16-pro-max': { width: 430, height: 932, notch: 'dynamic-island' },
    'iphone-14-pro': { width: 393, height: 852, notch: 'dynamic-island' },
    'iphone-14': { width: 390, height: 844, notch: 'notch' },
    'pixel-7': { width: 412, height: 915, notch: 'punch-hole' },
  };

  const spec = deviceSpecs[device];
  const frameWidth = orientation === 'portrait' ? spec.width : spec.height;
  const frameHeight = orientation === 'portrait' ? spec.height : spec.width;
  const homeBarHeight = 34;

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 32,
        backgroundColor: darkMode ? '#0a0a0a' : '#f5f5f5' 
      }}
    >
      {/* Device Frame */}
      <div 
        style={{
          position: 'relative',
          width: frameWidth + 24,
          height: frameHeight + 24,
        }}
      >
        {/* Outer Frame */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 55,
            background: darkMode 
              ? 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 50%, #0f0f0f 100%)'
              : 'linear-gradient(145deg, #e8e8e8 0%, #d4d4d4 50%, #c0c0c0 100%)',
            boxShadow: darkMode 
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255,255,255,0.1)'
              : '0 25px 50px -12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.8)',
          }}
        />
        
        {/* Inner Bezel */}
        <div 
          style={{
            position: 'absolute',
            top: 6,
            left: 6,
            right: 6,
            bottom: 6,
            borderRadius: 50,
            background: '#000',
          }}
        />

        {/* Screen Area */}
        <div 
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            width: frameWidth,
            height: frameHeight,
            borderRadius: 44,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Dynamic Island - absolute positioned */}
          {spec.notch === 'dynamic-island' && (
            <div 
              style={{ 
                position: 'absolute',
                top: 12,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 126, 
                height: 37,
                backgroundColor: '#000',
                borderRadius: 9999,
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ width: 12, height: 12, borderRadius: 9999, backgroundColor: '#1a1a1a', marginRight: 24 }} />
            </div>
          )}
          
          {/* App Content - explicit height = total - homeBar */}
          <div 
            style={{ 
              width: '100%',
              height: frameHeight - homeBarHeight,
              overflow: 'hidden',
            }}
          >
            {children}
          </div>

          {/* Home Bar - always at bottom */}
          <div 
            style={{
              width: '100%',
              height: homeBarHeight,
              backgroundColor: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <div 
              style={{ 
                width: 134, 
                height: 5, 
                backgroundColor: '#fff',
                borderRadius: 9999,
              }}
            />
          </div>
        </div>

        {/* Side Buttons */}
        <div 
          style={{
            position: 'absolute',
            left: -2,
            top: 180,
            width: 3,
            height: 35,
            borderRadius: '2px 0 0 2px',
            background: darkMode ? '#2a2a2a' : '#c0c0c0',
          }}
        />
        <div 
          style={{
            position: 'absolute',
            left: -2,
            top: 230,
            width: 3,
            height: 35,
            borderRadius: '2px 0 0 2px',
            background: darkMode ? '#2a2a2a' : '#c0c0c0',
          }}
        />
        <div 
          style={{
            position: 'absolute',
            right: -2,
            top: 200,
            width: 3,
            height: 50,
            borderRadius: '0 2px 2px 0',
            background: darkMode ? '#2a2a2a' : '#c0c0c0',
          }}
        />
        <div 
          style={{
            position: 'absolute',
            left: -2,
            top: 130,
            width: 3,
            height: 20,
            borderRadius: '2px 0 0 2px',
            background: darkMode ? '#2a2a2a' : '#c0c0c0',
          }}
        />
      </div>
    </div>
  );
};

export default DeviceFrame;
