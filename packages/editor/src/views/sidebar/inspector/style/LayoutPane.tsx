import { observer } from "mobx-react-lite";
import React from "react";
import {
  FourEdgeGrid,
  Pane,
  PaneHeading,
  PaneHeadingRow,
  RowGroup,
  RowPackLeft,
} from "@seanchas116/paintkit/src/components/sidebar/Inspector";
import staticPositionIcon from "@seanchas116/paintkit/src/icon/StaticPosition";
import hStackIcon from "@seanchas116/paintkit/src/icon/HStack";
import textIcon from "@seanchas116/paintkit/src/icon/Text";
import edgeTopIcon from "@seanchas116/paintkit/src/icon/EdgeTop";
import edgeRightIcon from "@seanchas116/paintkit/src/icon/EdgeRight";
import edgeBottomIcon from "@seanchas116/paintkit/src/icon/EdgeBottom";
import edgeLeftIcon from "@seanchas116/paintkit/src/icon/EdgeLeft";
import visibilityOffIcon from "@iconify-icons/ic/outline-visibility-off";
import arrowForwardIcon from "@iconify-icons/ic/outline-arrow-forward";
import closeIcon from "@iconify-icons/ic/outline-close";
import wrapTextIcon from "@iconify-icons/ic/outline-wrap-text";
import alignVerticalTopIcon from "@iconify-icons/ic/outline-align-vertical-top";
import alignVerticalCenterIcon from "@iconify-icons/ic/outline-align-vertical-center";
import alignVerticalBottomIcon from "@iconify-icons/ic/outline-align-vertical-bottom";
import alignStretchIcon from "@seanchas116/paintkit/src/icon/AlignStretch";
import justifyStartIcon from "@seanchas116/paintkit/src/icon/JustifyStart";
import justifyCenterIcon from "@seanchas116/paintkit/src/icon/JustifyCenter";
import justifyEndIcon from "@seanchas116/paintkit/src/icon/JustifyEnd";
import justifySpaceBetweenIcon from "@seanchas116/paintkit/src/icon/JustifySpaceBetween";
import { IconRadio } from "@seanchas116/paintkit/src/components/IconRadio";
import spaceBarIcon from "@iconify-icons/ic/outline-space-bar";
import styled from "styled-components";
import { StyleInspectorState } from "../../../../state/StyleInspectorState";
import { lengthPercentageUnits } from "./Units";
import { StyleDimensionInput } from "./Util";

const verticalSpaceBarIcon = {
  ...spaceBarIcon,
  rotate: 1,
};

const displayOptions = [
  {
    value: "block",
    icon: staticPositionIcon,
  },
  {
    value: "flex",
    icon: hStackIcon,
  },
  // TODO: grid
  {
    value: "inline",
    icon: textIcon,
  },
  {
    value: "none",
    icon: visibilityOffIcon,
  },
];

const flexDirectionOptions = [
  {
    value: "row",
    icon: arrowForwardIcon,
  },
  {
    value: "column",
    icon: { ...arrowForwardIcon, rotate: 1 },
  },
  {
    value: "row-reverse",
    icon: { ...arrowForwardIcon, rotate: 2 },
  },
  {
    value: "column-reverse",
    icon: { ...arrowForwardIcon, rotate: 3 },
  },
];

const flexWrapOptions = [
  {
    value: "nowrap",
    icon: closeIcon,
  },
  {
    value: "wrap",
    icon: wrapTextIcon,
  },
  {
    value: "wrap-reverse",
    icon: { ...wrapTextIcon, vFlip: true },
  },
];

const alignItemsOptionsRow = [
  {
    value: "stretch",
    icon: alignStretchIcon,
  },
  {
    value: "flex-start",
    icon: alignVerticalTopIcon,
  },
  {
    value: "center",
    icon: alignVerticalCenterIcon,
  },
  {
    value: "flex-end",
    icon: alignVerticalBottomIcon,
  },
];

const alignItemsOptionsColumn = alignItemsOptionsRow.map((option) => ({
  value: option.value,
  icon: { ...option.icon, rotate: (option.icon.rotate ?? 0) - 1 },
}));

const justifyContentOptionsRow = [
  {
    value: "flex-start",
    icon: justifyStartIcon,
  },
  {
    value: "center",
    icon: justifyCenterIcon,
  },

  {
    value: "flex-end",
    icon: justifyEndIcon,
  },
  {
    value: "space-between",
    icon: justifySpaceBetweenIcon,
  },
];

const justifyContentOptionsRowReverse = justifyContentOptionsRow.map(
  (option) => ({
    value: option.value,
    icon: { ...option.icon, rotate: (option.icon.rotate ?? 0) + 2 },
  })
);

const justifyContentOptionsColumn = justifyContentOptionsRow.map((option) => ({
  value: option.value,
  icon: { ...option.icon, rotate: (option.icon.rotate ?? 0) + 1 },
}));

const justifyContentOptionsColumnReverse = justifyContentOptionsRow.map(
  (option) => ({
    value: option.value,
    icon: { ...option.icon, rotate: (option.icon.rotate ?? 0) + 3 },
  })
);

export const LayoutPane: React.FC<{
  state: StyleInspectorState;
}> = observer(function LayoutPane({ state }) {
  if (state.styles.length === 0) {
    return null;
  }

  const computedDisplay = state.props.display.computed;
  const computedFlexDirection = state.props.flexDirection.computed;

  const flexInputs =
    computedDisplay === "flex" ? (
      <>
        <RowPackLeft>
          <IconRadio
            options={flexDirectionOptions}
            value={state.props.flexDirection.value}
            placeholder={state.props.flexDirection.computed}
            unsettable
            onChange={state.props.flexDirection.onChange}
          />
          <IconRadio
            options={flexWrapOptions}
            value={state.props.flexWrap.value}
            placeholder={state.props.flexWrap.computed}
            unsettable
            onChange={state.props.flexWrap.onChange}
          />
        </RowPackLeft>
        <RowPackLeft>
          <IconRadio
            options={
              computedFlexDirection?.includes("column")
                ? alignItemsOptionsColumn
                : alignItemsOptionsRow
            }
            value={state.props.alignItems.value}
            placeholder={state.props.alignItems.computed}
            unsettable
            onChange={state.props.alignItems.onChange}
          />
          <SizedDimensionInput
            icon={verticalSpaceBarIcon}
            units={lengthPercentageUnits}
            property={state.props.rowGap}
          />
        </RowPackLeft>
        <RowPackLeft>
          <IconRadio
            options={
              computedFlexDirection === "column-reverse"
                ? justifyContentOptionsColumnReverse
                : computedFlexDirection === "row-reverse"
                ? justifyContentOptionsRowReverse
                : computedFlexDirection === "column"
                ? justifyContentOptionsColumn
                : justifyContentOptionsRow
            }
            value={state.props.justifyContent.value}
            placeholder={state.props.justifyContent.computed}
            unsettable
            onChange={state.props.justifyContent.onChange}
          />
          <SizedDimensionInput
            icon={spaceBarIcon}
            units={lengthPercentageUnits}
            property={state.props.columnGap}
          />
        </RowPackLeft>
      </>
    ) : null;

  const paddingInputs =
    computedDisplay !== "none" ? (
      <FourEdgeGrid>
        <StyleDimensionInput
          icon={edgeTopIcon}
          units={lengthPercentageUnits}
          property={state.props.paddingTop}
        />
        <StyleDimensionInput
          icon={edgeRightIcon}
          units={lengthPercentageUnits}
          property={state.props.paddingRight}
        />
        <StyleDimensionInput
          icon={edgeBottomIcon}
          units={lengthPercentageUnits}
          property={state.props.paddingBottom}
        />
        <StyleDimensionInput
          icon={edgeLeftIcon}
          units={lengthPercentageUnits}
          property={state.props.paddingLeft}
        />
      </FourEdgeGrid>
    ) : null;

  return (
    <Pane>
      <PaneHeadingRow>
        <PaneHeading>Layout</PaneHeading>
      </PaneHeadingRow>
      <RowGroup>
        <IconRadio
          options={displayOptions}
          value={state.props.display.value}
          placeholder={state.props.display.computed}
          unsettable
          onChange={state.props.display.onChange}
        />
        {paddingInputs}
        {flexInputs}
      </RowGroup>
    </Pane>
  );
});

const SizedDimensionInput = styled(StyleDimensionInput)`
  width: 72px;
`;
