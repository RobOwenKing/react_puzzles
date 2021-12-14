const INPUT_MAPS = [
  {
    '1': {'entry': 'star'},
    '2': {'centres': 'star'},
    '3': {'entry': 'dot'},
    '4': {'centres': 'hsl(0 67% 67%)'},
    '5': {'centres': 'hsl(40 67% 67%)'},
    '6': {'centres': 'hsl(80 67% 67%)'},
    '7': {'centres': 'hsl(120 67% 67%)'},
    '8': {'centres': 'hsl(160 67% 67%)'},
    '9': {'centres': 'hsl(200 67% 67%)'}
  }
];

export const puzzleToInputMaps = (puzzle) => {
  return INPUT_MAPS;
};
