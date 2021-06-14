import DomJs from '../lib/index.js';
const { GetStyleString } = DomJs;

console.log(GetStyleString({
  ['.just-got-rekt']: {
    display: 'none',
    backgroundColor: 'red',
    padding: 10,
    border: {
      topRadius: 10,
      leftColor: 'green'
    },
    position: 'absolute',
    ['&:hover']: {
      backgroundColor: 'green',
      ['&.wow']: {
        color: 'blue',
        ['&.yes']: 'display: flex;',
        ['@media (max-width: 480px)']: {
          width: '100%'
        }
      }
    },
    ['@media (min-width: 480px)']: {
      fontSize: 10
    }
  }
}, {
  ['.very-nice']: {
    backgroundColor: 'blue'
  }
}));