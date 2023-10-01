import { Routes, Route } from "react-router-dom";
import Home from "./components/screens/Home";
import Profile from "./components/screens/Profile";
import Referrals from "./components/screens/Referrals";
import Logout from "./components/screens/Logout";
import Bonus from "./components/screens/Bonus";
import Levels from "./components/screens/Levels";
import Leaders from "./components/screens/Leaders";
import Offers from "./components/screens/Offers";
import Adgem from "./components/screens/applications/Adgem";
import Offeroc from "./components/screens/applications/Offeroc";
import Wannads from "./components/screens/applications/Wannads";
import Cpx from "./components/screens/applications/Cpx";
import OffersAll from "./components/screens/applications/Offersall";
import Bitcotasks from "./components/screens/applications/Bitcotasks";
import Offerscrypto from "./components/screens/applications/Offerscrypto";
import Links from "./components/screens/Links";
import LinksApprove from "./components/screens/LinksApprove";
import Faucet from "./components/screens/Faucet";
import Withdraw from "./components/screens/Withdraw";
import Challenge from "./components/screens/Challenge";
import Tasks from "./components/screens/Tasks";
import AdminTasks from "./components/screens/admin/AdminTasks";
import PtcAdmin from "./components/screens/admin/PtcAdmin";
import TaskSingle from "./components/screens/TaskSingle";
import TaskSingleAdmin from "./components/screens/admin/TaskSingleAdmin";
import Ptc from "./components/screens/Ptc";
import PtcIframe from "./components/screens/PtcIframe";
import Files from "./components/screens/Files";
import Ad from "./components/screens/Ad";
import FilesAdmin from "./components/screens/admin/FilesAdmin";
import FileSingle from "./components/shared/FileSingle";
import FileSingleAdmin from "./components/screens/admin/FileSingleAdmin";
import Blog from "./components/screens/Blog";
import BlogPage from "./components/screens/BlogPage";
import BlogAdmin from "./components/screens/admin/BlogAdmin";
import Clix from "./components/screens/applications/Clix";
import FaucetClaim from "./components/screens/FaucetClaim";
import Contacts from "./components/screens/Contacts";

function App() {
  return (
    <Routes>
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/blog-page/:id" element={<BlogPage />} />
      <Route path="/admin_article" element={<BlogAdmin />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/ad" element={<Ad />} />
      <Route path="/files_single_admin/:id" element={<FileSingleAdmin />} />
      <Route path="/files_single/:id" element={<FileSingle />} />
      <Route path="/admin_files" element={<FilesAdmin />} />
      <Route path="/files" element={<Files />} />
      <Route path="/ptciframe/:id/:time" element={<PtcIframe />} />
      <Route path="/task_approve/:id" element={<TaskSingleAdmin />} />
      <Route path="/tasks_single/:id" element={<TaskSingle />} />
      <Route path="/admin_tasks" element={<AdminTasks />} />
      <Route path="/admin_ptc" element={<PtcAdmin />} />
      <Route path="/ptc" element={<Ptc />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/challenge" element={<Challenge />} />
      <Route path="/withdraw" element={<Withdraw />} />
      <Route path="/faucet_claim" element={<FaucetClaim />} />
      <Route path="/faucet" element={<Faucet />} />
      <Route path="/linksapprove" element={<LinksApprove />} />
      <Route path="/links" element={<Links />} />
      <Route path="/clix" element={<Clix />} />
      <Route path="/offerscrypto" element={<Offerscrypto />} />
      <Route path="/bitcotasks" element={<Bitcotasks />} />
      <Route path="/offersall" element={<OffersAll />} />
      <Route path="/cpx" element={<Cpx />} />
      <Route path="/wannads" element={<Wannads />} />
      <Route path="/offeroc" element={<Offeroc />} />
      <Route path="/adgem" element={<Adgem />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/leaders" element={<Leaders />} />
      <Route path="/levels" element={<Levels />} />
      <Route path="/bonus" element={<Bonus />} />
      <Route path="/referrals" element={<Referrals />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/code/:code" element={<Home />} />
      <Route index element={<Home />} />
    </Routes>
  );
}

export default App;
