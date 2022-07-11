import { IAddon, IAddonFormFields } from '../modules/addons';

export class RedisCluster implements IAddon {
    public id: string = 'redis-cluster';
    public operator = 'redis-operator';
    public enabled = false;
    public name: string = 'Redis Cluster';
    public icon: string = 'redis.png';
    public plural: string = 'redisclusters';
    public version: string = 'v0.9.0';
    public description: string = 'TBD';

    public formfields: {[key: string]: IAddonFormFields} = {
        'metadata.name':{
            type: 'text',
            label: 'Redis Cluster Name',
            name: 'metadata.name',
            required: true,
            default: 'redis-cluster',
            description: 'The name of the Redis cluster'
        },
        'spec.clusterSize':{
            type: 'number',
            label: 'Clustersize',
            name: 'spec.clusterSize',
            default: 3,
            required: true,
            description: 'Number of Redis nodes in the cluster'
        },
        'spec.redisExporter.enabled':{
            type: 'switch',
            label: 'Exporter enabled',
            name: 'spec.redisExporter.enabled',
            default: true,
            required: true
        },
        'spec.kubernetesConfig.resources.limits.cpu': {
            type: 'text',
            label: 'CPU Limit',
            name: 'spec.kubernetesConfig.resources.limits.cpu',
            default: '101m',
            required: true
        },
        'spec.kubernetesConfig.resources.limits.memory': {
            type: 'text',
            label:'Memory Limit',
            name: 'spec.kubernetesConfig.resources.limits.memory',
            default: '128Mi',
            required: true
        },
        'spec.kubernetesConfig.resources.requests.cpu': {
            type: 'text',
            label: 'CPU Requests',
            name: 'spec.kubernetesConfig.resources.requests.cpu',
            default: '101m',
            required: true
        },
        'spec.kubernetesConfig.resources.requests.memory': {
            type: 'text',
            label: 'Memory Requests',
            name: 'spec.kubernetesConfig.resources.requests.memory',
            default: '128Mi',
            required: true
        },
        'spec.storage.volumeClaimTemplate.sepc.resources.requests.storage': {
            type: 'text',
            label: 'Storage Size',
            name: 'spec.storage.volumeClaimTemplate.sepc.resources.requests.storage',
            default: '1Gi',
            required: true
        }
    };

    public crd = {
        apiVersion: 'redis.redis.opstreelabs.in/v1beta1',
        kind: 'RedisCluster',
        metadata: {
            name: this.formfields['metadata.name'].default as string || 'redis-cluster'
        },
        spec: {
            clusterSize: this.formfields['spec.clusterSize'].default as number || 3,
            kubernetesConfig: {
                image: 'quay.io/opstree/redis:v6.2.5',
                imagePullPolicy: 'IfNotPresent',
                resources: {
                    limits: {
                        cpu: this.formfields['spec.kubernetesConfig.resources.limits.cpu'].default as string || '101m',
                        memory: this.formfields['spec.kubernetesConfig.resources.limits.memory'].default as string || '128Mi',
                    },
                    requests: {
                        cpu: this.formfields['spec.kubernetesConfig.resources.requests.cpu'].default as string || '101m',
                        memory: this.formfields['spec.kubernetesConfig.resources.requests.memory'].default as string || '128Mi'
                    }
                }
            },
            redisExporter: {
                enabled: this.formfields['spec.redisExporter.enabled'].default as boolean || false,
                image: 'quay.io/opstree/redis-exporter:1.0'
            },
            redisFollower: {
                serviceType: 'ClusterIP'
            },
            redisLeader: {
                serviceType: 'ClusterIP'
            },
            storage: {
                volumeClaimTemplate: {
                    spec: {
                        accessModes: [
                            'ReadWriteOnce'
                        ],
                        resources: {
                            requests: {
                                storage: this.formfields['spec.storage.volumeClaimTemplate.sepc.resources.requests.storage'].default as string || '1Gi'
                            }
                        }
                    }
                }
            }
        }
    }
    env: [] = [];
}



export class Redis implements IAddon {
    public id: string = 'redis-standalone';
    public operator = 'redis-operator';
    public enabled = false;
    public name: string = 'Redis';
    public icon: string = 'redis.png';
    public plural: string = 'redisclusters';
    public version: string = 'v0.9.0';
    public description: string = 'TBD';

    public formfields: {[key: string]: IAddonFormFields} = {
        'metadata.name':{
            type: 'text',
            label: 'Redis Cluster Name',
            name: 'metadata.name',
            required: true,
            default: 'redis-cluster',
            description: 'The name of the Redis cluster'
        },
        'spec.redisExporter.enabled':{
            type: 'switch',
            label: 'Exporter enabled',
            name: 'spec.redisExporter.enabled',
            default: true,
            required: true
        },
        'spec.kubernetesConfig.resources.limits.cpu': {
            type: 'text',
            label: 'CPU Limit',
            name: 'spec.kubernetesConfig.resources.limits.cpu',
            default: '101m',
            required: true
        },
        'spec.kubernetesConfig.resources.limits.memory': {
            type: 'text',
            label:'Memory Limit',
            name: 'spec.kubernetesConfig.resources.limits.memory',
            default: '128Mi',
            required: true
        },
        'spec.kubernetesConfig.resources.requests.cpu': {
            type: 'text',
            label: 'CPU Requests',
            name: 'spec.kubernetesConfig.resources.requests.cpu',
            default: '101m',
            required: true
        },
        'spec.kubernetesConfig.resources.requests.memory': {
            type: 'text',
            label: 'Memory Requests',
            name: 'spec.kubernetesConfig.resources.requests.memory',
            default: '128Mi',
            required: true
        },
        'spec.storage.volumeClaimTemplate.sepc.resources.requests.storage': {
            type: 'text',
            label: 'Storage Size',
            name: 'spec.storage.volumeClaimTemplate.sepc.resources.requests.storage',
            default: '1Gi',
            required: true
        }
    };

    // https://www.convertsimple.com/convert-yaml-to-javascript-object/
    public crd = {
        apiVersion: 'redis.redis.opstreelabs.in/v1beta1',
        kind: 'Redis',
        metadata: {
            name: this.formfields['metadata.name'].default as string || 'redis-standalone'
        },
        spec: {
            clusterSize: 3,
            kubernetesConfig: {
                image: 'quay.io/opstree/redis:v6.2.5',
                imagePullPolicy: 'IfNotPresent',
                resources: {
                    limits: {
                        cpu: this.formfields['spec.kubernetesConfig.resources.limits.cpu'].default as string || '101m',
                        memory: this.formfields['spec.kubernetesConfig.resources.limits.memory'].default as string || '128Mi',
                    },
                    requests: {
                        cpu: this.formfields['spec.kubernetesConfig.resources.requests.cpu'].default as string || '101m',
                        memory: this.formfields['spec.kubernetesConfig.resources.requests.memory'].default as string || '128Mi'
                    }
                },
                serviceType: 'ClusterIP'
            },
            redisExporter: {
                enabled: this.formfields['spec.redisExporter.enabled'].default as boolean || false,
                image: 'quay.io/opstree/redis-exporter:1.0'
            },
            storage: {
                volumeClaimTemplate: {
                    spec: {
                        accessModes: [
                            'ReadWriteOnce'
                        ],
                        resources: {
                            requests: {
                                storage: this.formfields['spec.storage.volumeClaimTemplate.sepc.resources.requests.storage'].default as string || '1Gi'
                            }
                        }
                    }
                }
            }
        }
    }
    env: [] = [];
}