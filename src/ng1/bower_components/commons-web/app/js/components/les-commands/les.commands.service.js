(function () {
    'use strict';

    angular.module('les-commands').service('CommandsService', function ($state) {

        var service = {
            command: undefined,
            commands: [],
            visible: false
        };
        var id = 0;

        service.commands = [
            // SH - SHIPMENT
            {
                id: id++,
                code: 'SH01',
                name: 'commands.command.shipment.panel',
                state: 'shipment.panel'
            },
            {
                id: id++,
                code: 'SH02',
                name: 'commands.command.shipment.management',
                state: 'shipment.management'
            },
            {
                id: id++,
                code: 'SH03',
                name: 'commands.command.shipment.unload',
                state: 'shipment.shipment-unload'
            },
            {
                id: id++,
                code: 'SH04',
                name: 'commands.command.shipment.load',
                state: 'shipment.shipment-load'
            },
            {
                id: id++,
                code: 'SH05',
                name: 'commands.command.shipment.list',
                state: 'shipment.packing-list'
            },
            {
                id: id++,
                code: 'SH06',
                name: 'commands.command.shipment.report',
                state: 'shipment.report-process'
            },

            // DO - DOCUMENT
            {
                id: id++,
                code: 'DO01',
                name: 'commands.command.reference.document.manual',
                state: 'business-process.manual-document'
            },

            // CA - CALENDAR
            {
                id: id++,
                code: 'CA01',
                name: 'commands.command.calendar',
                state: 'scheduling.calendar'
            },

            // DA - DANFE
            {
                id: id++,
                code: 'DA01',
                name: 'commands.command.danfe.rejection',
                state: 'business-process.danfe.rejection'
            },

            // VO - VOLUME 
            {
                id: id++,
                code: 'VO01',
                name: 'commands.command.inspection.volume',
                state: 'goods-receipt.volume'
            },
            {
                id: id++,
                code: 'VO02',
                name: 'commands.command.inspection.volume.by.code',
                state: 'goods-receipt.volume.inspection.byCode'
            },
            {
                id: id++,
                code: 'VO03',
                name: 'commands.command.inspection.volume.by.bin',
                state: 'goods-receipt.volume.inspection.byBin'
            },
            {
                id: id++,
                code: 'VO04',
                name: 'commands.command.inspection.volume.change.bin',
                state: 'goods-receipt.volume.changeBin'
            },

            // MA -MATERIAL
            {
                id: id++,
                code: 'MA01',
                name: 'commands.command.inspection.material.list',
                state: 'goods-receipt.material.inspection.list'
            },

            {
                id: id++,
                code: 'MA02',
                name: 'commands.command.inspection.material.management',
                state: 'goods-receipt.material'
            },

            // SE - SERVICE
            {
                id: id++,
                code: 'SE01',
                name: 'commands.command.service.request.management',
                state: 'pickup-portal.service-request.search'
            },
            {
                id: id++,
                code: 'SE02',
                name: 'commands.command.service.request.new',
                state: 'pickup-portal.service-request.register.identification'
            },
            {
                id: id++,
                code: 'SE03',
                name: 'commands.command.service.executions',
                state: 'pickup-portal.executions.search'
            },

            // OP - OPERATION
            {
                id: id++,
                code: 'OP01',
                name: 'commands.command.operation.suplier.management',
                state: 'business-process.supplier'
            },
            {
                id: id++,
                code: 'OP02',
                name: 'commands.command.operation.suplier.new',
                state: 'business-process.supplier.register'
            },
            {
                id: id++,
                code: 'OP03',
                name: 'commands.command.operation.service.management',
                state: 'pickup-portal.service'
            },
            {
                id: id++,
                code: 'OP04',
                name: 'commands.command.operation.service.new',
                state: 'pickup-portal.service.register'
            },
            {
                id: id++,
                code: 'OP05',
                name: 'commands.command.operation.contract.management',
                state: 'pickup-portal.contract'
            },
            {
                id: id++,
                code: 'OP06',
                name: 'commands.command.operation.contract.new',
                state: 'pickup-portal.contract.register'
            },
            {
                id: id++,
                code: 'OP07',
                name: 'commands.command.operation.material.type.management',
                state: 'system.materialType'
            },
            {
                id: id++,
                code: 'OP08',
                name: 'commands.command.operation.material.type.new',
                state: 'system.materialType.register'
            },
            {
                id: id++,
                code: 'OP09',
                name: 'commands.command.operation.packing.type.management',
                state: 'system.packingType'
            },
            {
                id: id++,
                code: 'OP10',
                name: 'commands.command.operation.packing.type.new',
                state: 'system.packingType.register'
            },
            {
                id: id++,
                code: 'OP11',
                name: 'commands.command.operation.vehicle-type.management',
                state: 'system.vehicleType'
            },
            {
                id: id++,
                code: 'OP12',
                name: 'commands.command.operation.vehicle-type.new',
                state: 'system.vehicleType.register'
            },
            {
                id: id++,
                code: 'OP11',
                name: 'commands.command.operation.criticality.management',
                state: 'system.criticality'
            },
            {
                id: id++,
                code: 'OP12',
                name: 'commands.command.operation.criticality.new',
                state: 'system.criticality.register'
            },
            {
                id: id++,
                code: 'OP13',
                name: 'commands.command.operation.commodity.management',
                state: 'pickup-portal.commodity'
            },
            {
                id: id++,
                code: 'OP14',
                name: 'commands.command.operation.commodity.new',
                state: 'pickup-portal.commodity.register'
            },
            {
                id: id++,
                code: 'OP15',
                name: 'commands.command.operation.service.provider.management',
                state: 'service-provider.serviceProvider.search'
            },
            {
                id: id++,
                code: 'OP16',
                name: 'commands.command.operation.service.provider.new',
                state: 'service-provider.serviceProvider.register'
            },
            {
                id: id++,
                code: 'OP17',
                name: 'commands.command.operation.driver.management',
                state: 'service-provider.driver.search'
            },
            {
                id: id++,
                code: 'OP18',
                name: 'commands.command.operation.driver.new',
                state: 'service-provider.driver.register'
            },

            // TR - TRANSPORT
            {
                id: id++,
                code: 'TR01',
                name: 'commands.command.transport.request.management',
                state: 'transport.request'
            },
            {
                id: id++,
                code: 'TR02',
                name: 'commands.command.transport.request.new',
                state: 'transport.request.register'
            },
            {
                id: id++,
                code: 'TR03',
                name: 'commands.command.transport.route.management',
                state: 'transport.route'
            },
            {
                id: id++,
                code: 'TR04',
                name: 'commands.command.transport.route.new',
                state: 'transport.route.register'
            },
            {
                id: id++,
                code: 'TR05',
                name: 'commands.command.transport.point.management',
                state: 'transport.point'
            },
            {
                id: id++,
                code: 'TR06',
                name: 'commands.command.transport.point.new',
                state: 'transport.point.register'
            },
            {
                id: id++,
                code: 'TR07',
                name: 'commands.command.transport.monitor',
                state: 'transport.monitor'
            },

            // SY - SYSTEM
            {
                id: id++,
                code: 'SY01',
                name: 'commands.command.system.site.management',
                state: 'system.site'
            },
            {
                id: id++,
                code: 'SY02',
                name: 'commands.command.system.site.new',
                state: 'system.site.register'
            },
            {
                id: id++,
                code: 'SY03',
                name: 'commands.command.system.plant.management',
                state: 'system.company'
            },
            {
                id: id++,
                code: 'SY04',
                name: 'commands.command.system.plant.new',
                state: 'system.company.register'
            },
            {
                id: id++,
                code: 'SY05',
                name: 'commands.command.system.workplace.management',
                state: 'system.workplace'
            },
            {
                id: id++,
                code: 'SY06',
                name: 'commands.command.system.workplace.new',
                state: 'system.workplace.register'
            },
            {
                id: id++,
                code: 'SY07',
                name: 'commands.command.system.calendar.management',
                state: 'system.calendar'
            },
            {
                id: id++,
                code: 'SY08',
                name: 'commands.command.system.calendar.new',
                state: 'system.calendar.register'
            },
            {
                id: id++,
                code: 'SY09',
                name: 'commands.command.system.checklist.management',
                state: 'system.checklist'
            },
            {
                id: id++,
                code: 'SY10',
                name: 'commands.command.system.checklist.configure',
                state: 'system.checklist.configure'
            },
            {
                id: id++,
                code: 'SY11',
                name: 'commands.command.system.checklist.templates.management',
                state: 'system.checklist.templates'
            },
            {
                id: id++,
                code: 'SY12',
                name: 'commands.command.system.checklist.templates.new',
                state: 'system.checklist.templates.register'
            },
            {
                id: id++,
                code: 'SY13',
                name: 'commands.command.system.inspection-plan.management',
                state: 'system.inspection-plan'
            },
            {
                id: id++,
                code: 'SY14',
                name: 'commands.command.system.inspection-plan.register',
                state: 'system.inspection-plan.register'
            },
            {
                id: id++,
                code: 'SY15',
                name: 'commands.command.system.user.management',
                state: 'system.user'
            },
            {
                id: id++,
                code: 'SY16',
                name: 'commands.command.system.user.register',
                state: 'system.user.register'
            },
            {
                id: id++,
                code: 'SY17',
                name: 'commands.command.system.profile.management',
                state: 'system.profile'
            },
            {
                id: id++,
                code: 'SY18',
                name: 'commands.command.system.profile.register',
                state: 'system.profile.register'
            },

            // PO - PORTARIA
            {
                id: id++,
                code: 'PO01',
                name: 'commands.command.portaria.totem',
                state: 'totem'
            },
            {
                id: id++,
                code: 'PO02',
                name: 'commands.command.portaria.panel',
                state: 'tv.entrance-call-panel'
            },
            {
                id: id++,
                code: 'PO03',
                name: 'commands.command.portaria.configuration',
                state: 'tv.entrance-call-configuration'
            },

            // CO - CONFIGURATION
            {
                id: id++,
                code: 'CO01',
                name: 'commands.command.configuration',
                state: 'configuration.workplace'
            }
        ];

        function go(command) {
            $state.go(command.state);
            service.toggle();
        }

        function toggle() {
            service.visible = !service.visible;
            service.command = undefined;
        }

        angular.extend(service, {
            toggle: toggle,
            go: go
        });

        return service;
    });

})();
