import type { PaperStatus } from '@/constants/paper';

/**
 * Namespace Api
 *
 * All backend api type
 */
declare namespace Api {
  namespace Common {
    /** common params of paginating */
    interface PaginatingCommonParams {
      skipCount: number;
      maxResultCount: number;
      sorting?: string | null;
      filterField?: string | null;
      filterValue?: string | null;
    }

    interface PaginatingResponse<T extends NonNullable<unknown>> {
      totalCount: number;
      items: T[];
    }

    interface CommonRecord {
      id: string;
      creatorId: string | null;
      creationTime: string | null;
      lastModifierId: string | null;
      lastModificationTime: string | null;
      isDeleted: boolean | null;
      deleterId: string | null;
      deletionTime: string | null;
    }
  }
  namespace Paper {
    interface PaperRecord extends Common.CommonRecord {
      name: string;
      phoneNumber: string;
      address: string;
      problemType: string;
      problemDescription: string;
      solution: string | null;
      status: PaperStatus;
      receiverId: number | null;
      receiverName: string;
      workerId: number | null;
      workerName: string | null;
      worker2Id: number | null;
      worker2Name: string | null;
      receiveTime: string | null;
      completeTime: string | null;
      note: string | null;
    }

    interface CreateUpdatePaperParams {
      name: string;
      phoneNumber: string;
      address: string;
      problemType: string;
      problemDescription: string;
      solution: string | null;
      status: PaperStatus;
      receiverId: number | null;
      workerId: number | null;
      worker2Id: number | null;
      receiveTime: string | null;
      completeTime: string | null;
      note: string | null;
    }
  }

  namespace Worker {
    interface WorkerRecord extends Common.CommonRecord {
      name: string | null;
      workerId: number | null;
      userId: string | null;
    }

    interface CreateWorkerParams {
      name: string | null;
      workerId: number | null;
      userId: string | null;
    }

    interface UpdateWorkerParams {
      name: string | null;
    }
  }

  /**
   * namespace Auth
   *
   * backend api module: "auth"
   */
  namespace Auth {
    interface UserInfo {
      id: string;
      username: string;
      name: string;
      email: string;
      roles: string[];
    }
  }

  namespace Weather {
    interface WeatherInfo {
      code: number;
      updateTime: string;
      fxLink: string;
      now: {
        obsTime: string;
        temp: number;
        feelsLike: number;
        icon: string;
        text: string;
        wind360: number;
        windDir: string;
        windScale: number;
        windSpeed: number;
        humidity: number;
        precip: number;
        pressure: number;
        vis: number;
        cloud: number;
        dew: number;
      };
    }

    interface WeatherRequestParams {
      key: string;
      location: string;
      lang?: string;
    }
  }

  namespace Statistic {
    interface WorkerStatisticInfo {
      workerName: string;
      workerId: number;
      resolveCount: number;
    }

    interface StatisticParams extends Common.PaginatingCommonParams {
      startTime: string;
      endTime: string;
    }
  }

  /**
   * namespace Route
   *
   * backend api module: "route"
   */
  namespace Route {
    type ElegantConstRoute = import('@elegant-router/types').ElegantConstRoute;

    interface MenuRoute extends ElegantConstRoute {
      id: string;
    }

    interface UserRoute {
      routes: MenuRoute[];
      home: import('@elegant-router/types').LastLevelRouteKey;
    }
  }
}
