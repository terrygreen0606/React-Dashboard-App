// React-Select Custome Style
export const customStyles = { 
    control: base => ({
      ...base,
      height: 30,
      minHeight: 30,
      borderRadius: '8px',
    }),
    singleValue: base => ({
      ...base,
      top: '40%'
    }),
    indicatorSeparator: base => ({
      ...base,
    }),
    indicatorsContainer: base => ({
      ...base,
      height: 30,
    }),
  };