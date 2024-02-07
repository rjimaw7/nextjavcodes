import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { SortByType } from '@/shared/interfaces/ICodes';

interface Props {
  sort: SortByType;
  setSort: React.Dispatch<React.SetStateAction<SortByType>>;
  allCodesLoading: boolean;
}

const HomeFilter = ({ setSort, sort, allCodesLoading }: Props) => {
  return (
    <div className="primary-yellow flex items-center justify-center md:mx-4 md:justify-end lg:mx-24">
      <Select value={sort} onValueChange={(value: SortByType) => setSort(value)} disabled={allCodesLoading}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Most Viewed" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="primary-yellow">
            <SelectItem value="most_viewed">Most Viewed</SelectItem>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default HomeFilter;
