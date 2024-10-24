
import { useMemo, useState, memo, useCallback, useEffect } from 'react'
import Select, { StylesConfig, components, MenuProps, GroupBase, MultiValue } from "react-select";
import { QuestionNodeType, SalsPointType } from '../../types';
import { salesPoints } from '../../salesPoints';
import { useReactFlow } from '@xyflow/react';

type Props = {
  nodeId: string;
  choiceId: string;
  salePoints: SalsPointType[];
}

const SalesPointSelect = ({ nodeId, choiceId, salePoints }: Props) => {

  const [selectedOptions, setSelectedOptions] = useState<MultiValue<SalsPointType>>(salePoints);
  const { getNode, updateNodeData } = useReactFlow();

  useEffect(() => {
    setSelectedOptions(salePoints)
  }, [salePoints])

  const customStyles: StylesConfig<SalsPointType, true> = useMemo(() => (
    {
      control: (styles, { isDisabled, isFocused }) => ({
        ...styles,
        width: '100%',
        borderRadius: 'none',
        border: 'none',
        backgroundColor: '#0f172a',
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
      option: (styles, { isDisabled, isFocused, isSelected }) => ({
        ...styles,
        backgroundColor: isDisabled ? undefined : isSelected ? '#ccc' : isFocused ? '#ccc' : undefined,
        color: isDisabled ? '#ccc' : 'black',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled ? isSelected ? '#aaa' : '#aaa' : undefined,
        },
      }),
      multiValue: (styles) => ({
        ...styles,
        backgroundColor: '#4338ca',
        borderRadius: "0.75rem",
      }),
      multiValueLabel: (styles) => ({
        ...styles,
        color: "#eee",
        paddingRight: "0px"
      }),
      multiValueRemove: (styles) => ({
        ...styles,
        color: "grey",
        ':hover': {
          backgroundColor: "#a5b4fc",
          color: 'white',
          borderTopRightRadius: "0.75rem",
          borderBottomRightRadius: "0.75rem",
        },
      }),
      menu: (styles) => ({
        ...styles,
        marginTop: 0,
        fontSize: "0.65rem"
      }),
      valueContainer: (provided) => ({
        ...provided,
        padding: 0
      }),

    }), []);

  const handleSelectChange = useCallback((options: SalsPointType[] | null) => {

    if (options) {
      const node = getNode(nodeId);
      if (node) {
        const nodeData = node.data as QuestionNodeType;
        updateNodeData(
          nodeId, {
          ...nodeData,
          choices: nodeData.choices.map(c => c.id === choiceId ? { ...c, salePoints: options } : c)
        });
        setSelectedOptions(options);
      }
    }
  }, [salePoints]);


  return (
    <Select
      instanceId={`${choiceId}-s`}
      closeMenuOnSelect={false}
      defaultValue={salePoints}
      options={salesPoints}
      onChange={(options) => (options ? handleSelectChange([...options]) : null)}
      noOptionsMessage={() => "セールスポイントが見つかりません"}
      placeholder="ここをクリックするとセールスポイントを選べます"
      isSearchable={true}
      isMulti
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator: () => null,
        Menu: (props: MenuProps<SalsPointType, true, GroupBase<SalsPointType>>) => (<components.Menu {...props} className="nowheel" />)
      }}
      isOptionDisabled={() => selectedOptions.length >= 3}
      styles={customStyles}
    />
  )
}

export default memo(SalesPointSelect);

