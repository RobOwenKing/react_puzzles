const INPUT_MAPS = [
  {
    'for': ['starbattle'],
    'maps': [
      {
        '1': {'entry': 'star'},
        '2': {'centres': 'star'},
        '3': {'entry': 'dot'}
      }
    ]
  },
  {
    'for': ['starbattle', 'colour'],
    'maps': [
      {
        'mode': 'Colours',
        '1': {'colour': 'hsl(0 67% 67%)'},
        '2': {'colour': 'hsl(40 67% 67%)'},
        '3': {'colour': 'hsl(80 67% 67%)'},
        '4': {'colour': 'hsl(120 67% 67%)'},
        '5': {'colour': 'hsl(160 67% 67%)'},
        '6': {'colour': 'hsl(200 67% 67%)'},
        '7': {'colour': 'hsl(240 67% 67%)'},
        '8': {'colour': 'hsl(280 67% 67%)'},
        '9': {'colour': 'hsl(320 67% 67%)'}
      }
    ]
  }
];

export const puzzleToInputMaps = (puzzle) => {
  return INPUT_MAPS.filter(inputMap => {
    return inputMap.for.some(entry => {
      return entry in puzzle;
    });
  });
};
