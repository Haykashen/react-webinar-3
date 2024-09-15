import React from 'react';
import { createElement } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  function countWord(count)
  {
    let arrStrNumb = ['2','3','4']
    let arrNumb = [12,13,14]
    let str = (count+'')
    let laststr = str[str.length-1]
    console.log(str)  
      
    if(arrStrNumb.indexOf(laststr) != -1)
    {
      if(str.length>1 && str[str.length-2]=='1')// предпоследняя цифра 1
        return 'раз' 
      else 
        return 'раза'   
    }  
    else 
      return 'раз'  
  }

  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => {
                  store.selectItem(item.code);
                  if (item.selected) 
                  {
                    store.setClickCount(item.code);
                  }    
                }}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">{item.title}</div>
                <div className="Item-count_selected">{item.selectClickCount !== 0 ? `Выделяли ${item.selectClickCount} `+countWord(item.selectClickCount) : ''}</div>
                <div className="Item-actions">
                  <button onClick={() => store.deleteItem(item.code)}>Удалить</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
