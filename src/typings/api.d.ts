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
