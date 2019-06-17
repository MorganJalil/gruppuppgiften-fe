// We want to make sure that pouplateSelect does populate the select in a reasonable way
// It is working in integration with clearElement and createOption, and we also
// need to make sure this integration works

// We will start with creating a fake web page that populateSelect can find
// its parentNode in

// populateSelect calls fetch - so we also need to explicitly override it
// and replace it with a mock that returns predictable data.

// This way we can check the element afterwards and compare it to the expected
// value

const mockedResult = {
  data:
    {
      name: 'Pikachu', color: 'Yellow', age: 11, id: 1 
    },
};
  
  const mockedJsonResultPromise = Promise.resolve(mockedResult);
  
  const mockedFetchResultPromise = Promise.resolve({
    json: () => mockedJsonResultPromise,
  });

  
  describe('integration tests for populateSelect, clearElement and createOption', () => {
    let fetchBackup, populateSelect;
    let getByTypeAndId;
    beforeAll(() => {
      document.body.innerHTML = '<span id="animal-description" data-loaded="false">Please make your selection</span>';
      fetchBackup = window.fetch;
      window.fetch = jest.fn().mockReturnValue(mockedFetchResultPromise);
      getByTypeAndId = require('../../src/js/animalApp').getByTypeAndId;
    });
  
    afterAll(() => {
      if (fetchBackup) {
        window.fetch = fetchBackup;
      }
    });

    it('should display added pokemon in animal-description span.', (done) => {
      // Setup
      const expectedOutcome = 'name:Pikachu,color:Yellow,age:11,id:1';
      const $animalDescription = document.getElementById('animal-description');
      expect($animalDescription.innerHTML).toBe('Please make your selection');

      getByTypeAndId('pokemons', '1');

      process.nextTick(() => {
        expect($animalDescription.innerHTML).toBe(expectedOutcome);
        done();
      });
    });
  });