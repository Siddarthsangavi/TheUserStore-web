import { useEffect, useState } from 'react';
import { getWidgetData, setWidgetData } from '../db/indexedDB';
import { fetchContent } from '../api/content';

const WIDGET_KEY = 'default_widgets';

export const Home = () => {
  const [widgets, setWidgets] = useState<any[]>([]);

  useEffect(() => {
    const loadWidgets = async () => {
      // 1️⃣ Load from IndexedDB first
      let localData = await getWidgetData(WIDGET_KEY);

      if (!localData) {
        localData = { widgets: [] }; // fallback if nothing in IndexedDB
        await setWidgetData(WIDGET_KEY, localData);
      }

      setWidgets(localData.widgets ?? []); // show local data instantly

      fetchContent(WIDGET_KEY).then(fetchedData => {
        // normalize widgets
        const widgetsArray = Array.isArray(fetchedData.widgets) ? fetchedData.widgets : [];
          
        setWidgets(widgetsArray);               // update UI
        setWidgetData(WIDGET_KEY, { widgets: widgetsArray }); // always store
      });
    };

    loadWidgets();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Widgets</h1>
      {widgets.length ? (
        widgets.map((widget, idx) => (
          <div
            key={idx}
            style={{ border: '1px solid #ccc', margin: '5px', padding: '5px' }}
          >
            {JSON.stringify(widget)}
          </div>
        ))
      ) : (
        <p>Loading widgets...</p>
      )}
    </div>
  );
};
