import { useEffect, useState } from "react";
import { useApi } from "@/api/api";

export default function SubscriptionsTable() {
  const api = useApi();
  const [subs, setSubs] = useState<any[]>([]);
  const [newSub, setNewSub] = useState({
    userId: 1,
    plan: "",
    startDate: "",
    endDate: "",
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<{
    show: boolean;
    id?: number;
  }>({ show: false });

  const loadSubs = async () => {
    const res = await api.get("/subscriptions");
    setSubs(res.data);
  };

  const createSub = async () => {
    await api.post(`/subscriptions/user/${newSub.userId}`, {
      plan: newSub.plan,
      startDate: newSub.startDate,
      endDate: newSub.endDate,
    });
    setNewSub({ userId: 1, plan: "", startDate: "", endDate: "" });
    setShowAddModal(false);
    loadSubs();
  };

  const deleteSub = async (id: number) => {
    await api.delete(`/subscriptions/${id}`);
    setShowDeleteModal({ show: false });
    loadSubs();
  };

  useEffect(() => {
    loadSubs();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg w-75">
        <div className="card-body">
          <h2 className="card-title mb-4 text-center">Suscripciones</h2>

          <div className="d-flex justify-content-end mb-3">
            <button
              className="btn btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              Nueva Suscripción
            </button>
          </div>

          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Plan</th>
                <th>Inicio</th>
                <th>Fin</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.userId}</td>
                  <td>{s.plan}</td>
                  <td>{s.startDate}</td>
                  <td>{s.endDate}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() =>
                        setShowDeleteModal({ show: true, id: s.id })
                      }
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {subs.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-4">
                    No hay suscripciones registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de creación */}
      {showAddModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Nueva Suscripción</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">User ID</label>
                  <input
                    type="number"
                    className="form-control"
                    value={newSub.userId}
                    onChange={(e) =>
                      setNewSub({ ...newSub, userId: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Plan</label>
                  <input
                    className="form-control"
                    value={newSub.plan}
                    onChange={(e) =>
                      setNewSub({ ...newSub, plan: e.target.value })
                    }
                  />
                </div>
                <div className="row">
                  <div className="col">
                    <label className="form-label">Inicio</label>
                    <input
                      type="date"
                      className="form-control"
                      value={newSub.startDate}
                      onChange={(e) =>
                        setNewSub({ ...newSub, startDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="col">
                    <label className="form-label">Fin</label>
                    <input
                      type="date"
                      className="form-control"
                      value={newSub.endDate}
                      onChange={(e) =>
                        setNewSub({ ...newSub, endDate: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={createSub}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal.show && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">
                  Confirmar eliminación
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setShowDeleteModal({ show: false })}
                ></button>
              </div>
              <div className="modal-body">
                <p>¿Seguro que deseas eliminar esta suscripción?</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal({ show: false })}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteSub(showDeleteModal.id!)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
