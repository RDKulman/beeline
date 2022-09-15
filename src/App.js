import './App.scss';
import './vars.scss';
import React from 'react';
import { useState, useEffect} from 'react';

function App() {

  const [ persons, setPersons ] = useState([]);
  const [ showedPersons, setShowedPersons ] = useState([]);
  const [ addedPersons, setAddedPersons ] = useState(0);
  const [ removedPersons, setRemovedPersons ] = useState(0);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => setPersons(json))
  }, [])

  const showPersonInfo = ( personId ) => {
    // const neededPerson = persons.find(item => item.id === personId);
    setShowedPersons([...showedPersons, persons.find(item => item.id === personId)]);
    setAddedPersons(addedPersons + 1);
  }

  const deletePerson = ( personId ) => {
    setShowedPersons(showedPersons.filter(item => item.id !== personId))
    setRemovedPersons(removedPersons + 1)
  }

  return (
    <div className="app">
      <div className="container">

        <div className="person-details">
          {
            showedPersons.map(item => (
              <div className="person-card" key={ item.name  }>
                <h2 className="person-card__title">
                  { item.name }
                </h2>

                <ul className="list-reset person-card__list">
                  <li className="person-card__item" >
                    <div className="person-card__info">
                      <span>Phone: </span> { item.phone }
                    </div>
                  </li>

                  <li className="person-card__item" >
                    <div className="person-card__info">
                      <span>Website: </span> { item.website }
                    </div>
                  </li>

                  <li className="person-card__item" >
                    <div className="person-card__info">
                      <span>Email: </span> { item.email }
                    </div>
                  </li>

                  <li className="person-card__item" >
                    <div className="person-card__info">
                      <span>Company: </span> { item.company.name }
                    </div>
                  </li>
                </ul>
                
                <button className="btn-reset btn btn--control person-card__btn" onClick={() => deletePerson(item.id)} >Удалить из списка</button>
              </div>
            ))
          }
        </div>


        <div className="counters">
          <span className="counters__deleted">
            Удалено: { removedPersons }
          </span>

          <span className="counters__added">
            Добавлено: { addedPersons }
          </span>
        </div>

        <div className="btns-control-block">
          {
            persons.map(item => (
              <button className='btn-reset btn btn--control' key={item.id} onClick={() => showPersonInfo(item.id)} >
                { item.name }
              </button>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
