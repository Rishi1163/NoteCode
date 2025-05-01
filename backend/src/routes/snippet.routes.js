import { Router } from 'express'
import { getSnippet, postSnippet } from '../controller/shareCode.controller.js'

const snippetRouter = Router()

snippetRouter.post('/post',postSnippet)
snippetRouter.get('/:uuid', getSnippet)

export default snippetRouter