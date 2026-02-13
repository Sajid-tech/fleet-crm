import LoadingBar from "@/components/loader/loading-bar";
import ReceiptEdit from "@/app/receipt/recept-edit";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Maintenance from "@/components/common/maintenance";
import SignUp from "@/app/auth/sign-up";
import SignUPList from "@/app/master-settings/sign-up-list";

import EventList from "@/app/event/event-list";
import EventCreate from "@/app/event/event-create";
import EventEdit from "@/app/event/event-edit";
import EventEditSub from "@/app/event/event-edit-sub";
import PromoterPendingList from "@/app/promoter/promoter-pending-list";
import PanelConditionList from "@/app/panel-condition/panel-condition-list";
import TripList from "@/app/trip/trip-list";
import DriverList from "@/app/driver/driver-list";
import DriverActivityList from "@/app/driver-activity/driver-activity-list";
import VehicleList from "@/app/vehicle/vehicle-list";
import CreateDriver from "@/app/driver/create-driver";
import CreateVehicle from "@/app/vehicle/create-vehicle";
import EditDriver from "@/app/driver/edit-driver";
import EditVehicle from "@/app/vehicle/edit-vehicle";
import DriverAutoPostionList from "@/app/driver-auto-position/driver-auto-position-list";
import PaymentList from "@/app/payment/payment-list";
import AllThreeReport from "@/app/report/all-three-report";
const Login = lazy(() => import("@/app/auth/login"));
const DonorList = lazy(() => import("@/app/donor/donor-list/donor-list"));
const ReceiptCreate = lazy(
  () => import("@/app/donor/donor-list/receipt-create"),
);
const AllDownload = lazy(() => import("@/app/download/all-download"));
const NotFound = lazy(() => import("@/app/errors/not-found"));
const Home = lazy(() => import("@/app/home/home"));
const Chapter = lazy(() => import("@/app/master-settings/chapter"));
const Viewer = lazy(() => import("@/app/master-settings/viewer"));
const MembershipActive = lazy(
  () => import("@/app/membership/membership-active"),
);
const MemberShipDashboard = lazy(
  () => import("@/app/membership/membership-dashboard"),
);
const MemberShipInactive = lazy(
  () => import("@/app/membership/membership-inactive"),
);
const MembershipList = lazy(() => import("@/app/membership/membership-list"));
const FaqOther = lazy(() => import("@/app/other/faq/faq"));
const Notification = lazy(
  () => import("@/app/other/notification/notification"),
);
const Team = lazy(() => import("@/app/other/team/team"));
const ForgotPassword = lazy(
  () => import("@/components/forgot-password/forgot-password"),
);
const AuthRoute = lazy(() => import("./auth-route"));
const ProtectedRoute = lazy(() => import("./protected-route"));
const DonorCompanyCreate = lazy(
  () => import("@/app/donor/donor-list/donor-company-create"),
);
const DonorIndiviusalCreate = lazy(
  () => import("@/app/donor/donor-list/donor-indiviusal-create"),
);
const DonorView = lazy(() => import("@/app/donor/donor-list/donor-view"));
const DuplicateDonor = lazy(
  () => import("@/app/donor/duplicate/duplicate-donor"),
);
const DuplicateDonorEdit = lazy(
  () => import("@/app/donor/duplicate/duplicate-donor-edit"),
);
const Receipt = lazy(() => import("@/app/receipt/receipt"));
const ReceiptView = lazy(() => import("@/app/receipt/receipt-view"));

const RepeatedDonor = lazy(
  () => import("@/app/school/repeated-donor/repeated-donor"),
);
const SchoolAllotLetter = lazy(
  () => import("@/app/school/school-alloted/allotment-letter"),
);
const SchoolAlloted = lazy(
  () => import("@/app/school/school-alloted/school-alloted"),
);
const SchoolAllotEdit = lazy(
  () => import("@/app/school/school-alloted/school-alloted-edit"),
);
const SchoolAllotView = lazy(
  () => import("@/app/school/school-alloted/school-alloted-view"),
);
const DonorDetails = lazy(
  () => import("@/app/school/school-allotment/donor-details"),
);
const SchoolToAllot = lazy(
  () => import("@/app/school/school-allotment/school-allotment"),
);
const SchoolList = lazy(() => import("@/app/school/school-list/school-list"));
const SchoolListView = lazy(
  () => import("@/app/school/school-list/school-list-view"),
);
const Settings = lazy(() => import("@/app/setting/setting"));
const AllotedList = lazy(
  () => import("@/app/school/repeated-donor/alloted-list"),
);
const DonorIndiviusalEdit = lazy(
  () => import("@/app/donor/donor-list/donor-indiviusal-edit"),
);
const DonorCompanyEdit = lazy(
  () => import("@/app/donor/donor-list/donor-company-edit"),
);
const RecepitZeroList = lazy(
  () => import("@/app/recepit-super/recepit-zero-list"),
);
const RecepitNonZeroList = lazy(
  () => import("@/app/recepit-super/recepit-nonzero-list"),
);
const CreateViewer = lazy(
  () => import("@/components/master-settings/viewers/create-viewer"),
);
const EditViewer = lazy(
  () => import("@/components/master-settings/viewers/edit-viewer"),
);
const ChapterViewSuperAdmin = lazy(
  () => import("@/components/master-settings/chapter-superadmin/chapter-view"),
);
const ChapterCreate = lazy(
  () =>
    import("@/components/master-settings/chapter-superadmin/chapter-create"),
);
const ChapterViewAdmin = lazy(() => import("@/app/chapter/chapter-view-admin"));
const SuperReceiptDonor = lazy(
  () => import("@/app/change-recepit-donor/change-recepit-donor"),
);
const MultipleRecepitList = lazy(
  () => import("@/app/recepit-super/multiple-recepit-list"),
);
const FolderList = lazy(() => import("@/app/folder/folder/folder-list"));
const FileList = lazy(() => import("@/app/folder/file/file-list"));
const FileView = lazy(() => import("@/app/folder/file/file-view"));
const MultiAllotment = lazy(
  () => import("@/app/allotment-super/multi-download-allotment"),
);

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthRoute />}>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        <Route
          path="/forgot-password"
          element={
            <Suspense fallback={<LoadingBar />}>
              <ForgotPassword />
            </Suspense>
          }
        />
        <Route path="/maintenance" element={<Maintenance />} />
      </Route>

      <Route path="/" element={<ProtectedRoute />}>
        {/* dashboard  */}
        <Route
          path="/home"
          element={
            <Suspense fallback={<LoadingBar />}>
              <Home />
            </Suspense>
          }
        />
        {/* trip  */}
        <Route
          path="/trip"
          element={
            <Suspense fallback={<LoadingBar />}>
              {" "}
              <TripList />{" "}
            </Suspense>
          }
        />


        {/* driver  */}
            <Route
          path="/driver"
          element={
            <Suspense fallback={<LoadingBar />}>
              {" "}
              <DriverList />{" "}
            </Suspense>
          }
        />
           <Route
          path="/driver/driver-create"
          element={
            <Suspense fallback={<LoadingBar />}>
              {" "}
              <CreateDriver />{" "}
            </Suspense>
          }
        />

            <Route
          path="/driver/driver-edit/:id"
          element={
            <Suspense fallback={<LoadingBar />}>
              {" "}
              <EditDriver />{" "}
            </Suspense>
          }
        />
        

        {/* vehicle  */}
              <Route
          path="/vehicle"
          element={
            <Suspense fallback={<LoadingBar />}>
              {" "}
              <VehicleList />{" "}
            </Suspense>
          }
        />
             <Route
          path="/vehicle/vehicle-create"
          element={
            <Suspense fallback={<LoadingBar />}>
              {" "}
              <CreateVehicle />{" "}
            </Suspense>
          }
        />
         <Route
          path="/vehicle/vehicle-edit/:id"
          element={
            <Suspense fallback={<LoadingBar />}>
              {" "}
              <EditVehicle />{" "}
            </Suspense>
          }
        />

        {/* driver activity  */}
              <Route
          path="/activity-driver"
          element={
            <Suspense fallback={<LoadingBar />}>
              {" "}
              <DriverActivityList />{" "}
            </Suspense>
          }
        />




{/* driver auto position  */}
        <Route
          path="/position-auto-driver"
          element={
            <Suspense fallback={<LoadingBar />}>
              {" "}
              <DriverAutoPostionList />{" "}
            </Suspense>
          }
        />
        




{/* payment  */}
<Route
          path="/payment"
          element={
            <Suspense fallback={<LoadingBar />}>
              {" "}
              <PaymentList />{" "}
            </Suspense>
          }
        />
        <Route 
        path="/report"
        element={
            <Suspense fallback={<LoadingBar />}>
              <AllThreeReport />
            </Suspense>
          }
/>








        <Route
          path="/chapter"
          element={
            <Suspense fallback={<LoadingBar />}>
              <ChapterViewAdmin />
            </Suspense>
          }
        />

        <Route
          path="/event-create"
          element={
            <Suspense fallback={<LoadingBar />}>
              <EventCreate />
            </Suspense>
          }
        />
        <Route
          path="/event-edit/:id"
          element={
            <Suspense fallback={<LoadingBar />}>
              <EventEdit />
            </Suspense>
          }
        />
        <Route
          path="/event-edit-sub/:id"
          element={
            <Suspense fallback={<LoadingBar />}>
              <EventEditSub />
            </Suspense>
          }
        />

        {/* master-setting */}
        <Route
          path="/master/chapter"
          element={
            <Suspense fallback={<LoadingBar />}>
              <Chapter />
            </Suspense>
          }
        />
        <Route
          path="/master/chapter/create"
          element={
            <Suspense fallback={<LoadingBar />}>
              <ChapterCreate />
            </Suspense>
          }
        />
        <Route
          path="/master/chapter/view/:id"
          element={
            <Suspense fallback={<LoadingBar />}>
              <ChapterViewSuperAdmin />
            </Suspense>
          }
        />
        <Route
          path="/master/viewer"
          element={
            <Suspense fallback={<LoadingBar />}>
              <Viewer />
            </Suspense>
          }
        />
        <Route
          path="/master/signup"
          element={
            <Suspense fallback={<LoadingBar />}>
              <SignUPList />
            </Suspense>
          }
        />
        <Route
          path="/master/viewer/create"
          element={
            <Suspense fallback={<LoadingBar />}>
              <CreateViewer />
            </Suspense>
          }
        />
        <Route
          path="/master/viewer/edit/:id"
          element={
            <Suspense fallback={<LoadingBar />}>
              <EditViewer />
            </Suspense>
          }
        />

        {/* membership  */}
        <Route
          path="/membership/dashboard"
          element={
            <Suspense fallback={<LoadingBar />}>
              <MemberShipDashboard />
            </Suspense>
          }
        />
        <Route
          path="/member-list"
          element={
            <Suspense fallback={<LoadingBar />}>
              <MembershipList />
            </Suspense>
          }
        />
        <Route
          path="/membership/active"
          element={
            <Suspense fallback={<LoadingBar />}>
              <MembershipActive />
            </Suspense>
          }
        />
        <Route
          path="/membership/inactive"
          element={
            <Suspense fallback={<LoadingBar />}>
              <MemberShipInactive />
            </Suspense>
          }
        />

        {/* donor  */}
        <Route
          path="/donor/donors"
          element={
            <Suspense fallback={<LoadingBar />}>
              <DonorList />
            </Suspense>
          }
        />
        <Route
          path="/donor/donors-indiviusal-create"
          element={
            <Suspense fallback={<LoadingBar />}>
              <DonorIndiviusalCreate />
            </Suspense>
          }
        />
        <Route
          path="/donor/donors-company-create"
          element={
            <Suspense fallback={<LoadingBar />}>
              <DonorCompanyCreate />
            </Suspense>
          }
        />
        <Route
          path="/donor/donor-view/:id"
          element={
            <Suspense fallback={<LoadingBar />}>
              <DonorView />
            </Suspense>
          }
        />
        <Route
          path="/donor/donor-edit-indivisual/:id"
          element={
            <Suspense fallback={<LoadingBar />}>
              <DonorIndiviusalEdit />
            </Suspense>
          }
        />
        <Route
          path="/donor/donor-edit-company/:id"
          element={
            <Suspense fallback={<LoadingBar />}>
              <DonorCompanyEdit />
            </Suspense>
          }
        />
        <Route
          path="/donor/duplicate"
          element={
            <Suspense fallback={<LoadingBar />}>
              <DuplicateDonor />
            </Suspense>
          }
        />
        <Route
          path="/donor/duplicate-edit/:id"
          element={
            <Suspense fallback={<LoadingBar />}>
              <DuplicateDonorEdit />
            </Suspense>
          }
        />

        {/* receipt  */}
        <Route
          path="/receipt"
          element={
            <Suspense fallback={<LoadingBar />}>
              <Receipt />
            </Suspense>
          }
        />
        <Route
          path="/event-list"
          element={
            <Suspense fallback={<LoadingBar />}>
              <EventList />
            </Suspense>
          }
        />
        <Route
          path="/promoter"
          element={
            <Suspense fallback={<LoadingBar />}>
              <PromoterPendingList />
            </Suspense>
          }
        />
        <Route
          path="/panel-condition"
          element={
            <Suspense fallback={<LoadingBar />}>
              <PanelConditionList />
            </Suspense>
          }
        />
        <Route
          path="/receipt-view"
          element={
            <Suspense fallback={<LoadingBar />}>
              <ReceiptView />
            </Suspense>
          }
        />

        <Route
          path="/receipt-edit/:id"
          element={
            <Suspense fallback={<LoadingBar />}>
              <ReceiptEdit />
            </Suspense>
          }
        />

        <Route
          path="/donor-create-receipt/:id"
          element={
            <Suspense fallback={<LoadingBar />}>
              <ReceiptCreate />
            </Suspense>
          }
        />

        {/* school  */}
        <Route
          path="/school/list"
          element={
            <Suspense fallback={<LoadingBar />}>
              <SchoolList />
            </Suspense>
          }
        />
        <Route
          path="/school/list-view/:id"
          element={
            <Suspense fallback={<LoadingBar />}>
              <SchoolListView />
            </Suspense>
          }
        />
        <Route
          path="/school/to-allot"
          element={
            <Suspense fallback={<LoadingBar />}>
              <SchoolToAllot />
            </Suspense>
          }
        />
        <Route
          path="/school/donor-details/:id/:year/:fyear"
          element={
            <Suspense fallback={<LoadingBar />}>
              <DonorDetails />
            </Suspense>
          }
        />
        <Route
          path="/school/alloted"
          element={
            <Suspense fallback={<LoadingBar />}>
              <SchoolAlloted />
            </Suspense>
          }
        />
        <Route
          path="/school/allotedit/:id/:year"
          element={
            <Suspense fallback={<LoadingBar />}>
              <SchoolAllotEdit />
            </Suspense>
          }
        />
        <Route
          path="/school/allotview/:id"
          element={
            <Suspense fallback={<LoadingBar />}>
              <SchoolAllotView />
            </Suspense>
          }
        />
        <Route
          path="/school/repeated"
          element={
            <Suspense fallback={<LoadingBar />}>
              <RepeatedDonor />
            </Suspense>
          }
        />
        <Route
          path="/school/allotment-letter/:id"
          element={
            <Suspense fallback={<LoadingBar />}>
              <SchoolAllotLetter />
            </Suspense>
          }
        />
        <Route
          path="/school/repeat-list/:id"
          element={
            <Suspense fallback={<LoadingBar />}>
              <AllotedList />
            </Suspense>
          }
        />

        

        {/* download  */}
        <Route
          path="/download"
          element={
            <Suspense fallback={<LoadingBar />}>
              <AllDownload />
            </Suspense>
          }
        />

        {/* others  */}
        <Route
          path="/other/faq"
          element={
            <Suspense fallback={<LoadingBar />}>
              <FaqOther />
            </Suspense>
          }
        />
        <Route
          path="/other/team"
          element={
            <Suspense fallback={<LoadingBar />}>
              <Team />
            </Suspense>
          }
        />
        <Route
          path="/other/notification"
          element={
            <Suspense fallback={<LoadingBar />}>
              <Notification />
            </Suspense>
          }
        />

        {/* settings  */}
        <Route
          path="/folder"
          element={
            <Suspense fallback={<LoadingBar />}>
              <FolderList />
            </Suspense>
          }
        />

        <Route
          path="/settings"
          element={
            <Suspense fallback={<LoadingBar />}>
              <Settings />
            </Suspense>
          }
        />

        <Route
          path="/recepit/zero-list"
          element={
            <Suspense fallback={<LoadingBar />}>
              <RecepitZeroList />
            </Suspense>
          }
        />
        <Route
          path="/recepit/non-zero-list/:id"
          element={
            <Suspense fallback={<LoadingBar />}>
              <RecepitNonZeroList />
            </Suspense>
          }
        />
        <Route
          path="/recepit/change-donor"
          element={
            <Suspense fallback={<LoadingBar />}>
              <SuperReceiptDonor />
            </Suspense>
          }
        />
        <Route
          path="/recepit/multiple-list"
          element={
            <Suspense fallback={<LoadingBar />}>
              <MultipleRecepitList />
            </Suspense>
          }
        />
        <Route
          path="/folder"
          element={
            <Suspense fallback={<LoadingBar />}>
              <FolderList />
            </Suspense>
          }
        />
        <Route
          path="/file/:id"
          element={
            <Suspense fallback={<LoadingBar />}>
              <FileList />
            </Suspense>
          }
        />

        <Route
          path="/file-preview"
          element={
            <Suspense fallback={<LoadingBar />}>
              <FileView />
            </Suspense>
          }
        />
        <Route
          path="/multi-allotment"
          element={
            <Suspense fallback={<LoadingBar />}>
              <MultiAllotment />
            </Suspense>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
