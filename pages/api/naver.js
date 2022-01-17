import {naver} from '../../data/naver'

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(naver)
  } else if (req.method === 'POST') {
      const search = req.body.search
      const newNaver = {
        id: Date.now(),
        keyword: search,
        count : 1,
      }      
      console.log(search)
      naver.push(newNaver)
      res.status(201).json(naver)
  }
}
