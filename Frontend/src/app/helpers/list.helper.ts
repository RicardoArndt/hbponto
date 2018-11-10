export class ListHelper {
    public static update(originalMap: any, 
                         newValue: string, 
                         propertyNewValue: string, 
                         findId: string): any {
        var newList;
        originalMap.subscribe(x => newList = x.update(
            x.findIndex(item => { 
            return item.get("id") === findId; 
            }), item => {
            return item.set(propertyNewValue, newValue);
            }
        ));
        
        return newList;
    }
}