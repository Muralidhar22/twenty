import { useIcons } from 'twenty-ui';

import { useObjectNameSingularFromPlural } from '@/object-metadata/hooks/useObjectNameSingularFromPlural';
import { Filter } from '@/object-record/object-filter-dropdown/types/Filter';
import { useHandleToggleTrashColumnFilter } from '@/object-record/record-index/hooks/useHandleToggleTrashColumnFilter';
import { SortOrFilterChip } from '@/views/components/SortOrFilterChip';
import { useCombinedViewFilters } from '@/views/hooks/useCombinedViewFilters';
import { useParams } from 'react-router-dom';

type VariantFilterChipProps = {
  viewFilter: Filter;
  viewBarId: string;
};

export const VariantFilterChip = ({
  viewFilter,
  viewBarId,
}: VariantFilterChipProps) => {
  const { removeCombinedViewFilter } = useCombinedViewFilters();

  const { objectNamePlural } = useParams();

  const { objectNameSingular } = useObjectNameSingularFromPlural({
    objectNamePlural: objectNamePlural ?? '',
  });

  const { toggleSoftDeleteFilterState } = useHandleToggleTrashColumnFilter({
    objectNameSingular,
    viewBarId,
  });

  const { getIcon } = useIcons();

  const handleRemoveClick = () => {
    removeCombinedViewFilter(viewFilter.id);
    if (
      viewFilter.definition.label === 'Deleted' &&
      viewFilter.operand === 'isNotEmpty'
    ) {
      toggleSoftDeleteFilterState(false);
    }
  };

  return (
    <SortOrFilterChip
      key={viewFilter.fieldMetadataId}
      testId={viewFilter.fieldMetadataId}
      variant={viewFilter.variant}
      labelValue={viewFilter.definition.label}
      Icon={getIcon(viewFilter.definition.iconName)}
      onRemove={handleRemoveClick}
    />
  );
};
