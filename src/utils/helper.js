export const gptQuery=(query)=>{
  return  "Act as a movie recommendation system and suggest some movies for the query :" +
  query +
  ".only give me names of 5 movies , comma separated like the example result given ahead . Example results : Gadar , Don , Sholay , Avengers , batman";
}