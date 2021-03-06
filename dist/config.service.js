"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_constants_1 = require("./config.constants");
const events_1 = require("events");
let EtcdConfigService = class EtcdConfigService extends events_1.EventEmitter {
    constructor(configInstance) {
        super();
        this.configInstance = configInstance;
        this.configInstance.listener.subscribe((res) => {
            try {
                const newValue = JSON.parse(res.value);
                this.set(res.key, newValue);
                this.emit(res.key, newValue);
            }
            catch (error) {
                this.emit('error', error);
            }
        });
    }
    get(name) {
        return this.configInstance.configs.get(name);
    }
    set(name, val) {
        this.configInstance.configs.set(name, val);
    }
};
EtcdConfigService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(config_constants_1.ETCD_CONFIGS)),
    __metadata("design:paramtypes", [Object])
], EtcdConfigService);
exports.EtcdConfigService = EtcdConfigService;
