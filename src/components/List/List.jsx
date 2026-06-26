const List = ({
  ItemComponent,
  items,
  setItems = null,
  setSelectedElement,
  setIsDelete,
}) => {
  return (
    <div className="space-y-4">
      {items
        .map((element) => (
          <ItemComponent
            key={element.url}
            setDeletingElement={setSelectedElement}
            element={element}
            setElements={setItems}
          />
        ))
        .reverse()}
    </div>
  );
};

export default List;
