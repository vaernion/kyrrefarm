let namesRaw = `[ ]	imt3003_report_last_100_ANSI.json	2021-02-27 18:45 	34K	 
[ ]	imt3003_report_last_100_Amigos.json	2021-02-27 18:45 	35K	 
[ ]	imt3003_report_last_100_ArcticDynamite.json	2021-02-27 18:46 	39K	 
[ ]	imt3003_report_last_100_BestQualityConfirmed.json	2021-02-27 18:46 	40K	 
[ ]	imt3003_report_last_100_BigTechEnergy.json	2021-02-27 18:46 	40K	 
[ ]	imt3003_report_last_100_BobaTech.json	2021-02-27 18:46 	34K	 
[ ]	imt3003_report_last_100_ColdCompany.json	2021-02-27 18:45 	38K	 
[ ]	imt3003_report_last_100_CoolCompany2.json	2021-02-27 18:45 	39K	 
[ ]	imt3003_report_last_100_CoolSec.json	2021-02-27 18:45 	38K	 
[ ]	imt3003_report_last_100_CryptoChasers.json	2021-02-27 18:46 	39K	 
[ ]	imt3003_report_last_100_CyberSec4U.json	2021-02-27 18:46 	42K	 
[ ]	imt3003_report_last_100_DBG.json	2021-02-27 18:45 	34K	 
[ ]	imt3003_report_last_100_DigitalSpire.json	2021-02-27 18:46 	43K	 
[ ]	imt3003_report_last_100_Digitalxo.json	2021-02-27 18:46 	40K	 
[ ]	imt3003_report_last_100_Garcia.json	2021-02-27 18:45 	38K	 
[ ]	imt3003_report_last_100_Gutta.json	2021-02-27 18:45 	36K	 
[ ]	imt3003_report_last_100_HaNor.json	2021-02-27 18:45 	31K	 
[ ]	imt3003_report_last_100_KyrreconnectMiningCorp.json	2021-02-27 18:46 	35K	 
[ ]	imt3003_report_last_100_LideY.json	2021-02-27 18:45 	37K	 
[ ]	imt3003_report_last_100_LosBandidos.json	2021-02-27 18:45 	35K	 
[ ]	imt3003_report_last_100_Machina.json	2021-02-27 18:45 	37K	 
[ ]	imt3003_report_last_100_MigwaTech.json	2021-02-27 18:46 	39K	 
[ ]	imt3003_report_last_100_PALA.json	2021-02-27 18:45 	33K	 
[ ]	imt3003_report_last_100_Paymer.json	2021-02-27 18:46 	41K	 
[ ]	imt3003_report_last_100_PiedPiper.json	2021-02-27 18:45 	38K	 
[ ]	imt3003_report_last_100_RedPanda.json	2021-02-27 18:45 	35K	 
[ ]	imt3003_report_last_100_RichBusiness.json	2021-02-27 18:46 	40K	 
[ ]	imt3003_report_last_100_RobusteBois.json	2021-02-27 18:45 	35K	 
[ ]	imt3003_report_last_100_SOLO.json	2021-02-27 18:45 	33K	 
[ ]	imt3003_report_last_100_SneverSyntaks.json	2021-02-27 18:46 	40K	 
[ ]	imt3003_report_last_100_SpaceX.json	2021-02-27 18:46 	38K	 
[ ]	imt3003_report_last_100_Spelunk.json	2021-02-27 18:45 	35K	 
[ ]	imt3003_report_last_100_StudySec.json	2021-02-27 18:46 	37K	 
[ ]	imt3003_report_last_100_SublimeUptimeAssoc.json	2021-02-27 18:45 	38K	 
[ ]	imt3003_report_last_100_SviStrom.json	2021-02-27 18:45 	40K	 
[ ]	imt3003_report_last_100_TA.json	2021-02-27 18:46 	40K	 
[ ]	imt3003_report_last_100_TA2.json	2021-02-27 18:46 	46K	 
[ ]	imt3003_report_last_100_TableKnights.json	2021-02-27 18:45 	35K	 
[ ]	imt3003_report_last_100_TeamNedetid.json	2021-02-27 18:46 	39K	 
[ ]	imt3003_report_last_100_TeamOppetid.json	2021-02-27 18:45 	35K	 
[ ]	imt3003_report_last_100_TeamSonic.json	2021-02-27 18:46 	45K	 
[ ]	imt3003_report_last_100_TheMiiipCompany.json	2021-02-27 18:45 	36K	 
[ ]	imt3003_report_last_100_VerdanskAS.json	2021-02-27 18:46 	38K	 
[ ]	imt3003_report_last_100_Warriors.json	2021-02-27 18:45 	37K	 
[ ]	imt3003_report_last_100_WireTick.json	2021-02-27 18:45 	36K	 
[ ]	imt3003_report_last_100_Xgenic.json	2021-02-27 18:45 	33K	 
[ ]	imt3003_report_last_100_Xiens.json	2021-02-27 18:46 	37K	 
[ ]	imt3003_report_last_100_YSL.json	2021-02-27 18:45 	35K	 
[ ]	imt3003_report_last_100_ZoomerBook.json	2021-02-27 18:45 	35K	 
[ ]	imt3003_report_last_100_oppoverBakke.json	2021-02-27 18:45 	38K	 
[ ]	imt3003_report_last_100_pwned.json	2021-02-27 18:46 	44K	 
[ ]	imt3003_report_last_100_whoAMI.json	2021-02-27 18:46 	39K	 `;

let regex = /^(.*?)(\.json)/;
export const companyNames = namesRaw
  .split("\n")
  .map((e) => e.substr(28))
  .map((e) => e.match(regex))
  .map((e) => (e && typeof e[1] === "string" ? e[1] : "Unknown"));
