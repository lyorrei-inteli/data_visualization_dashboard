from pydantic import BaseModel
from datetime import datetime


# Definindo o formato do input usando Pydantic
class InputData(BaseModel):
    name: str
    car: float
    bicycle: float
    trucks: float
    motorbike: float
    bus: float
    others: float
    animals: float
    special_cargos: float
    tractors: float
    utilities: float
    unharmed: float
    slight_injury: float
    moderate_injury: float
    serious_injury: float
    month: int
    year: int
    dayofweek: int
    road_info_Descending_Curve: int
    road_info_East_Going: int
    road_info_North_Going: int
    road_info_Other: int
    road_info_South_Going: int
    road_info_Top_Curve: int
    road_info_West_Going: int
    accident_place_Autopista_Fernao_Dias: int
    accident_place_Autopista_Fluminense: int
    accident_place_Autopista_Litoral_Sul: int
    accident_place_Autopista_Planalto_Sul: int
    accident_place_Autopista_Regis_Bittencourt: int
    accident_place_Concebra: int
    accident_place_Concepa: int
    accident_place_Concer: int
    accident_place_Cro: int
    accident_place_Crt: int
    accident_place_ECO050: int
    accident_place_ECO101: int
    accident_place_Ecoponte: int
    accident_place_Ecoriominas: int
    accident_place_Ecosul: int
    accident_place_Ecovias_do_Araguaia: int
    accident_place_Ecovias_do_Cerrado: int
    accident_place_MSVIA: int
    accident_place_Novadutra: int
    accident_place_RIOSP: int
    accident_place_Rodovia_do_Aco: int
    accident_place_Transbrasiliana: int
    accident_place_VIA040: int
    accident_place_Via_Bahia: int
    accident_place_Via_Brasil: int
    accident_place_Via_Costeira: int
    accident_place_Via_Sul: int


from typing import List



class SingleOutputData(BaseModel):
    prediction: int
    result: str


class MultiOutputData(BaseModel):
    predictions: List[SingleOutputData]


class PrecisionInfo(BaseModel):
    id: str
    car: float
    bicycle: float
    trucks: float
    motorbike: float
    bus: float
    others: float
    animals: float
    special_cargos: float
    tractors: float
    utilities: float
    unharmed: float
    slight_injury: float
    moderate_injury: float
    serious_injury: float
    month: int
    year: int
    dayofweek: int
    road_info_Descending_Curve: int
    road_info_East_Going: int
    road_info_North_Going: int
    road_info_Other: int
    road_info_South_Going: int
    road_info_Top_Curve: int
    road_info_West_Going: int
    accident_place_Autopista_Fernao_Dias: int
    accident_place_Autopista_Fluminense: int
    accident_place_Autopista_Litoral_Sul: int
    accident_place_Autopista_Planalto_Sul: int
    accident_place_Autopista_Regis_Bittencourt: int
    accident_place_Concebra: int
    accident_place_Concepa: int
    accident_place_Concer: int
    accident_place_Cro: int
    accident_place_Crt: int
    accident_place_ECO050: int
    accident_place_ECO101: int
    accident_place_Ecoponte: int
    accident_place_Ecoriominas: int
    accident_place_Ecosul: int
    accident_place_Ecovias_do_Araguaia: int
    accident_place_Ecovias_do_Cerrado: int
    accident_place_MSVIA: int
    accident_place_Novadutra: int
    accident_place_RIOSP: int
    accident_place_Rodovia_do_Aco: int
    accident_place_Transbrasiliana: int
    accident_place_VIA040: int
    accident_place_Via_Bahia: int
    accident_place_Via_Brasil: int
    accident_place_Via_Costeira: int
    accident_place_Via_Sul: int
    predictionId: str

class User(BaseModel):
    id: str
    name: str
    email: str

class Prediction(BaseModel):
    id: str
    name: str
    createdAt: datetime
    updatedAt: datetime
    result: int
    authorId: str
    PredictionInfo: PrecisionInfo
    author: User
