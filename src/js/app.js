import '../css/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';


document.addEventListener('DOMContentLoaded', () => {
  intApp();

  const form = formUI.form;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    onFormSubmit();
  });

  async function intApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCitiesList);
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue; 

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    ticketsUI.renderTickets(locations.lastSearch);

    const tick = document.querySelector('.tickets-section');
    tick.addEventListener('click', onClick);

    function onClick(e) {
      console.log(e);
    }
  }

});

