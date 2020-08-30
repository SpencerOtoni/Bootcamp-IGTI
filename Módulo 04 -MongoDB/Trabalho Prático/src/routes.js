import  Router  from 'express';

import AccountHolderController from './app/controllers/AccountHolderController.js'
import InstitutionController from './app/controllers/InstitutionController.js'

const routes = new Router();

routes.put('/deposito',AccountHolderController.depositOperation)
routes.put('/saque',AccountHolderController.withdrawalOperation)
routes.get('/saldo',AccountHolderController.balanceOperation)
routes.put('/transferencia',AccountHolderController.transfersOperation)

routes.delete('/delete',InstitutionController.deleteaccount)
routes.get('/average',InstitutionController.averageAgency)
routes.get('/lowest-balance',InstitutionController.lowestBalanceAgency)
routes.get('/highest-balance',InstitutionController.highestBalanceAgency)
routes.put('/transfer',InstitutionController.transferAgency)

export default routes