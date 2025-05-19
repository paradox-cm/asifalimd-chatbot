export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            // This function runs immediately when the page loads
            
            function setThemeClass(theme) {
              document.documentElement.classList.remove('light', 'dark');
              document.documentElement.classList.add(theme);
              
              // Dispatch a custom event that components can listen for
              window.dispatchEvent(new CustomEvent('theme-change', { 
                detail: { theme: theme, source: 'script' } 
              }));
            }
            
            function applyTheme() {
              // Check if user has a stored preference
              const storedTheme = localStorage.getItem('dr-asif-theme');
              
              // Check system preference
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              
              if (storedTheme === 'dark') {
                setThemeClass('dark');
              } else if (storedTheme === 'light') {
                setThemeClass('light');
              } else {
                // No stored preference, use system preference
                setThemeClass(prefersDark ? 'dark' : 'light');
              }
            }
            
            // Apply theme on initial load
            applyTheme();

            // Set up listener for system preference changes
            const colorSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            // Force an immediate check of the system preference
            const handleSystemThemeChange = (e) => {
              // Only update if user hasn't set a manual preference
              if (!localStorage.getItem('dr-asif-theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                
                // Apply the theme immediately
                setThemeClass(newTheme);
                
                // Log the change for debugging
                console.log('System preference changed to:', newTheme);
                
                // Dispatch a custom event with more detailed information
                window.dispatchEvent(new CustomEvent('theme-change', { 
                  detail: { 
                    theme: newTheme, 
                    source: 'system',
                    timestamp: new Date().getTime()
                  } 
                }));
              }
            };

            handleSystemThemeChange(colorSchemeMediaQuery);
            
            // This function will run whenever the system color scheme changes
            

            // Add the event listener using the appropriate method based on browser support
            if (colorSchemeMediaQuery.addEventListener) {
              colorSchemeMediaQuery.addEventListener('change', handleSystemThemeChange);
            } else if (colorSchemeMediaQuery.addListener) {
              // For older browsers
              colorSchemeMediaQuery.addListener(handleSystemThemeChange);
            }
            
            // Expose a global function to reset to system preference
            window.resetToSystemTheme = function() {
              localStorage.removeItem('dr-asif-theme');
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              setThemeClass(prefersDark ? 'dark' : 'light');
              return prefersDark ? 'dark' : 'light';
            };
            
            // Expose a global function to set a specific theme
            window.setManualTheme = function(theme) {
              if (theme !== 'dark' && theme !== 'light') return;
              localStorage.setItem('dr-asif-theme', theme);
              setThemeClass(theme);
            };
          })();
        `,
      }}
    />
  )
}
