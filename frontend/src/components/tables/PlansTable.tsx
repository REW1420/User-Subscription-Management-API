import { useEffect, useState } from "react";
import { useApi } from "@/api/api";

export default function PlansTable() {
  const api = useApi();
  const [plans, setPlans] = useState<any[]>([]);
  const [newPlan, setNewPlan] = useState({ name: "", defaultDurationDays: 30 });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<{
    show: boolean;
    id?: number;
  }>({ show: false });

  const loadPlans = async () => {
    const res = await api.get("/plans");
    setPlans(res.data);
  };

  const createPlan = async () => {
    await api.post("/plans", newPlan);
    setNewPlan({ name: "", defaultDurationDays: 30 });
    setShowAddModal(false);
    loadPlans();
  };

  const deletePlan = async (id: number) => {
    await api.delete(`/plans/${id}`);
    setShowDeleteModal({ show: false });
    loadPlans();
  };

  useEffect(() => {
    loadPlans();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg w-75">
        <div className="card-body">
          <h2 className="card-title mb-4 text-center">Planes</h2>

          <div className="d-flex justify-content-end mb-3">
            <button
              className="btn btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              Añadir Plan
            </button>
          </div>

          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Duración (días)</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.defaultDurationDays}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() =>
                        setShowDeleteModal({ show: true, id: p.id })
                      }
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {plans.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-muted py-4">
                    No hay planes registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para agregar plan */}
      {showAddModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Nuevo Plan</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nombre del plan</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newPlan.name}
                    onChange={(e) =>
                      setNewPlan({ ...newPlan, name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Duración (días)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={newPlan.defaultDurationDays}
                    onChange={(e) =>
                      setNewPlan({
                        ...newPlan,
                        defaultDurationDays: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={createPlan}>
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
                <p>¿Estás seguro de que deseas eliminar este plan?</p>
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
                  onClick={() => deletePlan(showDeleteModal.id!)}
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
