
import React, { useMemo, useState, memo, useEffect } from 'react'
import Select, { StylesConfig, components, MenuProps, GroupBase, MultiValue } from "react-select";
import { ChoiceType, SalsPointType } from '../../types';
import chroma from 'chroma-js';
import { salesPoints } from '../../salesPoints';

type Props = {
  choice: ChoiceType;
  onChangeSelect: (_choiceId: string, options: SalsPointType[] | null) => void;
}

const SalesPointSelect = ({ choice, onChangeSelect }: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<SalsPointType>>([]);

  const customStyles: StylesConfig<SalsPointType, true> = useMemo(() => (
    {
      control: (styles, state) => ({
        ...styles,
        width: '100%',
        borderRadius: 'none',
        border: 'none',
        backgroundColor: 'transparent',
        fontSize: "0.7rem",
        textAlign: 'center',
        boxShadow: "none",
        '&:hover': {
          border: 'none',
          cursor: 'pointer',
        },
      }),
      input: (styles) => ({
        ...styles,
        "input:focus": {
          boxShadow: "none",
          outline: "none"
        },
      }),
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        const color = chroma('indigo');
        return {
          ...styles,
          backgroundColor: isDisabled
            ? undefined
            : isSelected
              ? 'indigo'
              : isFocused
                ? color.alpha(0.1).css()
                : undefined,
          color: isDisabled
            ? '#ccc'
            : isSelected
              ? chroma.contrast(color, 'white') > 2
                ? 'white'
                : 'black'
              : 'indigo',
          cursor: isDisabled ? 'not-allowed' : 'default',

          ':active': {
            ...styles[':active'],
            backgroundColor: !isDisabled
              ? isSelected
                ? 'indigo'
                : color.alpha(0.3).css()
              : undefined,
          },
        };
      },
      multiValue: (styles, { data }) => {
        const color = chroma('indigo');
        return {
          ...styles,
          backgroundColor: '#4b008226',
        };
      },
      multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: "black",
      }),
      multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: "grey",
        ':hover': {
          backgroundColor: "purple",
          color: 'white',
        },
      }),
      menu: (styles) => ({
        ...styles,
        marginTop: 0,
        fontSize: "0.65rem"

        // backgroundColor: 'green',
      }),
      valueContainer: (provided, state) => ({
        ...provided,
        padding: 0,
        // height: 30
      }),

    }), []);


  const handleSelectChange = (_choiceId: string, options: SalsPointType[]) => {
    onChangeSelect(_choiceId, options);
    setSelectedOptions(options);
  }

  // console.log('shun')

  return (
    <Select
      instanceId={`${choice.id}-s`}
      closeMenuOnSelect={false}
      defaultValue={choice.salePoints}
      options={salesPoints}
      // onChange={(options) => setSelectedOptions(options)}
      onChange={(options) => (options ? handleSelectChange(choice.id, [...options]) : null)}
      noOptionsMessage={() => "セールスポイントが見つかりません"}
      placeholder="セールスポイントを選んでください"
      isSearchable={true}
      isMulti
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator: () => null,
        Menu: (props: MenuProps<SalsPointType, true, GroupBase<SalsPointType>>) => (<components.Menu {...props} className="nowheel" />)
      }}
      isOptionDisabled={() => selectedOptions.length >= 4}
      styles={customStyles}
    />
  )
}

export default memo(SalesPointSelect);