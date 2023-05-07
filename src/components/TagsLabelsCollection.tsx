import { FunctionComponent, ReactElement, memo } from 'react';

interface TagsLabelsCollectionProps {
  tags: string[];
}

function tagsLabelsGenerator(strings: string[]) {
  return strings.map((s): ReactElement => {
    return (
      <li className="tags-item" key={`tags-item-${s}}`}>
        <span className="tags-item-span">{s}</span>
      </li>
    );
  });
}

const TagsLabelsCollection: FunctionComponent<TagsLabelsCollectionProps> = ({ tags }) => {
  return (
    <div className="tags-items-list-wrapper">
      <ul className="tags-items-list-container">{tagsLabelsGenerator(tags)}</ul>
    </div>
  );
};

export default memo(TagsLabelsCollection);
