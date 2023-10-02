
context appTemplate.db {

entity Sales {
  key ID          : Integer;
      region      : String(100);
      country     : String(100);
      org         : String(4);
      amount      : Integer;
      comments    : String(100);
      criticality : Integer;
};

entity Foods {
  key ID          : Integer;
      Name        : String(100);
      Quantity    : String(100);
      UOM         : String(100);
};

entity Fooods {
  key ID          : Integer;
      Name        : String(100);
      Quantity    : String(100);
      UOM         : String(100);
      Username    : String(100);
      Digit       : String(100);
};

entity MPL {
  key MPLId       : String;
  key StepName        : String;
      Headers    : String;
      Properties         : String;
      Body    : String;
};

entity ErrorMPL {
  key Name       : String;
  key FlowId        : String;
      LogStart    : String;
      LogEnd         : String;
      ErrorText    : String;
      ChatGptResponse    : String;
      MonitoringLink    : String;
};

entity MPLResults {
  key FlowName       : String;
  key MPLID        : String;
      StartTime    : String;
      EndTime         : String;
      Status    : String;
};

}

@cds.persistence.exists
@cds.persistence.calcview
entity CV_SALES {
  key REGION  : String(100);
      AMOUNT  : Integer;
}

@cds.persistence.exists
@cds.persistence.calcview
entity CV_SESSION_INFO {
  key ITEM     : String(5000);
      VALUE    : String(5000);
}
