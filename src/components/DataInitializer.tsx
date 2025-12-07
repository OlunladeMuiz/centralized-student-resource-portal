import { useEffect, useState } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function DataInitializer() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initData = async () => {
      const hasInitialized = localStorage.getItem('dataInitialized');
      if (hasInitialized) {
        setInitialized(true);
        return;
      }

      try {
        const serverUrl = `https://${projectId}.supabase.co/functions/make-server-336197dd`;
        const response = await fetch(`${serverUrl}/init-data`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        });

        if (response.ok) {
          localStorage.setItem('dataInitialized', 'true');
          console.log('Sample data initialized successfully');
        }
      } catch (error) {
        console.error('Error initializing data:', error);
      } finally {
        setInitialized(true);
      }
    };

    initData();
  }, []);

  return null;
}
