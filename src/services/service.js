export default class GotService{
    constructor(){
      this._apiBase = 'https://www.anapioficeandfire.com/api';
    }
     getResource = async (url) => {
      const res = await fetch(`${this._apiBase}${url}`);
      
      if(!res.ok){
          throw new Error(`Could not fetch ${url} , ${res.status}`);
      }
      return await res.json();
  };

    getAllCharacters = async () =>{
      const res = await this.getResource('/characters?page=8&pageSize=10');
      return res.map(this._transformCharacter)
      
  }

    getCharacter = async(id)=> {
      const character= await this.getResource(`/characters/${id}`);
      return this.onShortName(character);
      
  }

     getAllBooks = async()=>{
        const res = await this.getResource('/books/');
        return res.map(this._transformBook);

        }

    getBook = async (id)=> {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
        }

    getAllHouses = async ()=>{
        const res = await this.getResource('/houses/');
        return res.map(this._transformHouse);

        }

    getHouse= async (id)=>{
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
        }

        _transformCharacter =(char)=>{
        
        function getIdFromUrl(item){
            const arr = item.split('/');
            const id = arr[arr.length - 1];
            return id;
        
        }   

        function emptyPlace(item){
            
            return item === ''? 'no information': item
            }
            return{
                url: getIdFromUrl(char.url),
                name: emptyPlace(char.name),
                gender: emptyPlace(char.gender),
                born: emptyPlace(char.born),
                died: emptyPlace(char.died),
                culture:emptyPlace(char.culture) 
            }
        }

        onShortName=(char)=>{
            function shorting(elem){
                if(elem.length>20){
                   return elem = elem.substring(0, 30)+'...';
                } else {
                    return elem;
                } 
            }
            function emptyPlace(item){
                return item === ''? 'no information': item
                }
            
            return{
                url: emptyPlace(shorting(char.url)),
                name: char.name,
                gender: emptyPlace(shorting(char.gender)),
                born: emptyPlace(shorting(char.born)),
                died: emptyPlace(shorting(char.died)),
                culture:emptyPlace(shorting(char.culture)) 
            }
        }


        _transformHouse =(house)=>{
            function getIdFromUrl(item){
                const arr = item.split('/');
                const id = arr[arr.length - 1];
                return id;
            
            } 
            function emptyPlace(item){
                return item === ''|| item.length === 1 ? 'no information': item
                }
            function shorting(elem){
                    if(Array.isArray(elem) && elem.length>2){

                       return elem[0];
                    } else {
                        return elem;
                    } 
                }
                return{
                url: getIdFromUrl(house.url),
                name: emptyPlace( house.name),
                region: emptyPlace( house.region),
                words: emptyPlace( house.words),
                titles: shorting(emptyPlace( house.titles)),
                ancestralWeapons: emptyPlace( house.ancestralWeapons)
            }
        }

        _transformBook =(book)=>{
            function getIdFromUrl(item){
                const arr = item.split('/');
                const id = arr[arr.length - 1];
                return id;
            
            } 
            function emptyPlace(item){
                return item === ''? 'no information': item
                }
                return{
                url: getIdFromUrl(book.url),
                name:emptyPlace( book.name),
                numberOfPages:emptyPlace( book.numberOfPages),
                publisher:emptyPlace( book.publisher),
                released:emptyPlace( book.released)
            }
        }

        

}
