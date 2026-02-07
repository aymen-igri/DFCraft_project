const List = ({ ItemComponent, items, setItems = null }) => {
    console.log("items", items)
    return (
        <div className="space-y-4">
            {items.map((element) => (
                <ItemComponent key={element.url} element={element} setElements={setItems} />
            ))}
        </div>
    )
}

export default List;