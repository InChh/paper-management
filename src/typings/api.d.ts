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
      sorting?: string;
      filterField?: string;
      filterValue?: string;
    }

    interface PaginatingResponse<T extends NonNullable<unknown>> {
      totalCount: number;
      items: T[];
    }

    interface CommonRecord {
      id: string;
      creatorId: string;
      creationTime: string;
      lastModifierId?: string;
      lastModificationTime?: string;
      isDeleted: boolean;
      deleterId?: string;
      deletionTime?: string;
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
      receiverId: number;
      receiverName: string;
      workerId: number | null;
      workerName: string | null;
      worker2Id: number | null;
      worker2Name: string | null;
      receiveTime: string;
      completeTime: string | null;
      note: string | null;
    }

    interface CreateUpdatePaperParams {
      name: string;
      phoneNumber: string;
      address: string;
      problemType: string;
      problemDescription: string;
      solution?: string;
      status: PaperStatus;
      receiverId: number;
      workerId?: number;
      worker2Id?: number;
      receiveTime: string;
      completeTime?: string;
      note?: string;
    }
  }

  namespace Worker {
    interface WorkerRecord extends Common.CommonRecord {
      name: string;
      workerId: number;
      userId: string;
    }

    interface CreateWorkerParams {
      name: string;
      workerId: number;
      userId: string;
    }

    interface UpdateWorkerParams {
      name: string;
    }
  }

  /**
   * namespace Auth
   *
   * backend api module: "auth"
   */
  namespace Auth {
    interface UserInfo {
      userId: string;
      userName: string;
      name: string;
      email: string;
      roles: string[];
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
