using {appTemplate.db as db} from '../db/data-model';
using {CV_SALES, CV_SESSION_INFO} from '../db/data-model';

service CatalogService @(path : '/catalog')
{
    entity Sales
      as select * from db.Sales
      actions {
        action boost() returns Sales;
      }
    ;

    entity Foods @(cds.persistence: { update: true })
      as select * from db.Foods
	  ;
    

    entity Fooods @(cds.persistence: { update: true })
      as select * from db.Fooods
	  ;
    entity MPL @(cds.persistence: { update: true })
      as select * from db.MPL
	  ;

    entity ErrorMPL @(cds.persistence: { update: true })
      as select * from db.ErrorMPL
	  ;
      entity MPLResults @(cds.persistence: { update: true })
      as select * from db.MPLResults
	  ;

    @readonly
    entity VSales
      as select * from CV_SALES
    ;

    @readonly
    entity SessionInfo
      as select * from CV_SESSION_INFO
    ;

    function topSales
      (amount: Integer)
      returns many Sales;

  };

  service DeleteService @(path: '/delete') {
  function deleteAllFoods() 
  returns String;
}

  service Fridge @(path: '/Fridge') {
  function msgFridge(param1: String) 
  returns String;
  function anothermsgFridge(param1: String,param2: String) 
  returns String;
}


